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
  const salesByDate = await Order.aggregate([
    { $match: { paymentStatus: "paid" } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        totalRevenue: { $sum: "$finalAmount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  const salesByCategory = await Order.aggregate([
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
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { salesByDate, salesByCategory },
        "Fetch Analytics Successfully"
      )
    );
});
const updateOrderStatus = asyncHandler(async (req, res) => {});
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
