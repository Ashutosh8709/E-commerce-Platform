import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import mongoose from "mongoose";

const getAllOrders = asyncHandler(async (req, res) => {
  // get user details from req.user
  // check if role is admin
  // give all orders done till now
  // need websockets
  const role = req.user?.role;
  if (role !== "admin") {
    throw new ApiError(401, "Unauthorized Access");
  }

  const orders = await Order.find({});

  if (!orders || !orders.length) {
    return res.status(200).json(new ApiResponse(400, [], "No Order Found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Fetched All orders successfully"));
});

const getAdminStats = asyncHandler(async (req, res) => {
  //total revenue, total orders, low stock items
  const [orderStats, lowStockItems] = await Promise.all([
    Order.aggregate([
      {
        $facet: {
          totalOrders: [{ $count: "count" }],
          totalRevenue: [
            { $match: { paymentStatus: "paid" } },
            { $group: { _id: null, total: { $sum: "$finalAmount" } } },
          ],
        },
      },
    ]),
    Product.aggregate([
      { $match: { stock: { $lte: 5 } } },
      {
        $lookup: {
          from: "sellers",
          localField: "sellerId",
          foreignField: "sellerId",
          as: "Seller",
        },
      },
      { $unwind: "$Seller" },
      {
        $project: {
          name: 1,
          stock: 1,
          "Seller.storeName": 1,
          "Seller.contactEmail": 1,
        },
      },
    ]),
  ]);

  const orderData = orderStats[0];
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalOrders: orderData.totalOrders[0]?.count || 0,
        totalRevenue: orderData.totalRevenue[0]?.total || 0,
        lowStockItems: lowStockItems.length === 0 ? [] : lowStockItems,
      },
      "Stats fetched Successfully"
    )
  );
});

const getSalesAnalytics = asyncHandler(async (req, res) => {
  const [result] = await Order.aggregate([
    { $match: { paymentStatus: "paid" } },
    {
      $facet: {
        salesByDate: [
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              totalRevenue: { $sum: "$finalAmount" },
            },
          },
          { $sort: { _id: 1 } },
        ],

        salesByCategory: [
          { $unwind: "$products" },
          {
            $lookup: {
              from: "products",
              localField: "products.productId",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          { $unwind: "$productInfo" },
          {
            $group: {
              _id: "$productInfo.category",
              totalRevenue: { $sum: "$products.priceAtAddition" },
            },
          },
          { $project: { category: "$_id", totalRevenue: 1, _id: 0 } },
        ],

        topSellingProducts: [
          { $unwind: "$products" },
          {
            $group: {
              _id: "$products.productId",
              totalSold: { $sum: "$products.quantity" },
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "_id",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          { $unwind: "$productInfo" },
          {
            $project: {
              _id: 0,
              productId: "$_id",
              productName: "$productInfo.name",
              category: "$productInfo.category",
              totalSold: 1,
            },
          },
          { $sort: { totalSold: -1 } },
          { $limit: 10 },
        ],

        orderByStatus: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              status: "$_id",
              count: 1,
            },
          },
        ],
        avgOrderValue: [
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$finalAmount" },
              totalOrders: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              avgOrderValue: { $divide: ["$totalRevenue", "$totalOrders"] },
            },
          },
        ],
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Fetch Analytics Successfully"));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!orderId || !status)
    throw new ApiError(404, "All details are required to update");

  const allowedStatuses = [
    "placed",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ];
  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      status,
    },
    { new: true }
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  global.io.emit("order:statusUpdated", {
    orderId: order._id,
    status: order.status,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order Status updated"));
});

const addProduct = asyncHandler(async (req, res) => {});
const updateProduct = asyncHandler(async (req, res) => {});
const deleteProduct = asyncHandler(async (req, res) => {});

export {
  getAllOrders,
  getAdminStats,
  updateOrderStatus,
  addProduct,
  updateProduct,
  deleteProduct,
  getSalesAnalytics,
};
