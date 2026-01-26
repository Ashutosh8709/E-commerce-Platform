import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserOrders,
  getById,
  cancel,
  returnOrder,
  reorder,
} from "../services/orderService";
import { handleError, handleSuccess } from "../utils";
import { placeOrder, verifyPayment } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const useOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: orders = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["orders", user?._id],
    queryFn: async () => {
      const res = await getUserOrders();
      return res.data.data || [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  const getOrderById = (orderId) =>
    useQuery({
      queryKey: ["order", user?._id, orderId],
      queryFn: async () => {
        const res = await getById(orderId);
        return res.data.data;
      },
      enabled: !!orderId,
      staleTime: 1000 * 60 * 5,
    });

  const cancelMutation = useMutation({
    mutationFn: async (orderId) => {
      const res = await cancel(orderId);
      return res.data.data;
    },
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(["orders", user?._id], (old = []) =>
        old.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order,
        ),
      );
      handleSuccess("Order cancelled successfully");
    },
    onError: (error) =>
      handleError(error?.response?.data?.message || "Failed to cancel order"),
  });

  const returnMutation = useMutation({
    mutationFn: async (orderId) => {
      const res = await returnOrder(orderId);
      return res.data.data;
    },
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(["orders", user?._id], (old = []) =>
        old.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order,
        ),
      );
      handleSuccess("Order return request placed successfully");
    },
    onError: (error) =>
      handleError(error?.response?.data?.message || "Failed to return order"),
  });

  const reorderMutation = useMutation({
    mutationFn: async (orderId) => {
      const res = await reorder(orderId);
      return res.data.data;
    },
    onSuccess: (newOrder) => {
      queryClient.setQueryData(["orders", user?._id], (old = []) => [
        newOrder,
        ...old,
      ]);
      handleSuccess("Order reordered successfully");
    },
    onError: (error) =>
      handleError(error?.response?.data?.message || "Failed to reorder"),
  });

  const placeOrderMutation = useMutation({
    mutationFn: async (selectedAddress) => {
      const res = await placeOrder(selectedAddress);
      const order = res.data.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.razorpayOrder.amount,
        currency: order.razorpayOrder.currency,
        name: "SwiftCart",
        description: "Purchase at MyStore",
        order_id: order.razorpayOrder.id,
        handler: async (response) => {
          try {
            const verifyRes = await verifyPayment(response);

            if (verifyRes.data.success) {
              handleSuccess("Payment Successful");

              await Promise.all([
                queryClient.invalidateQueries(["orders", user?._id]),
                queryClient.invalidateQueries(["cart", user?._id]),
              ]);

              setTimeout(() => navigate("/orders"), 200);
            }
          } catch (err) {
            handleError("Payment verification failed");
          }
        },
        theme: { color: "#4f46e5" },

        modal: {
          ondismiss: () => handleError("Payment cancelled"),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    },
    onError: () => handleError("Something went wrong while initiating payment"),
  });

  return {
    orders,
    loading: isLoading || isFetching,
    getOrderById,
    cancelOrder: cancelMutation.mutate,
    returnOrder: returnMutation.mutate,
    reorder: reorderMutation.mutate,
    placeOrder: placeOrderMutation.mutate,
  };
};
