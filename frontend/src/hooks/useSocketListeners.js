import { useEffect } from "react";
import socket from "../socket";
import { useQueryClient } from "@tanstack/react-query";
import { handleSuccess } from "../utils";

export function useSocketListeners() {
  const queryClient = useQueryClient();

  const isAdminPage = window.location.pathname.startsWith("/admin");

  useEffect(() => {
    console.log("%c⚡ Socket Listeners Attached Once", "color: yellow");
    socket.off("order:new");
    socket.off("order:statusUpdated");
    socket.off("product:lowStock");

    socket.on("order:new", (order) => {
      // 1️⃣ Update Orders List
      queryClient.setQueryData(["admin-orders"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: { data: [order, ...(old?.data?.data || [])] },
        };
      });

      // 2️⃣ Update STATS (Total Orders & Revenue)
      queryClient.setQueryData(["admin-stats"], (old) => {
        if (!old) return old;

        const s = old.data.data;
        const updatedRevenue =
          Number(s.totalRevenue) + Number(order.totalAmount);
        const updatedOrders = Number(s.totalOrders) + 1;

        return {
          ...old,
          data: {
            data: {
              ...s,
              totalRevenue: updatedRevenue,
              totalOrders: updatedOrders,
            },
          },
        };
      });

      // ⛳ Get UPDATED stats before calculating avg
      const updatedStats = queryClient.getQueryData(["admin-stats"])?.data
        ?.data;

      // 3️⃣ Update ANALYTICS revenue, orders & avg
      queryClient.setQueryData(["sales-analytics"], (old) => {
        if (!old || !updatedStats) return old;

        const a = old.data.data;

        const revenue = Number(updatedStats.totalRevenue) || 0;
        const orders = Number(updatedStats.totalOrders) || 1;

        const newAvg = +(revenue / orders).toFixed(2);

        return {
          ...old,
          data: {
            data: {
              ...a,
              totalRevenue: revenue, // 🔥 important
              totalOrders: orders, // 🔥 important
              avgOrderValue: [{ avgOrderValue: newAvg }],
            },
          },
        };
      });
      queryClient.invalidateQueries(["sales-analytics"]);
      if (isAdminPage) handleSuccess(`New Order — ₹${order.totalAmount}`);
    });

    socket.on("order:statusUpdated", () => {
      queryClient.invalidateQueries(["sales-analytics"]);
      queryClient.invalidateQueries(["admin-orders"]);
      if (isAdminPage) handleSuccess("Order Status Updated");
    });

    socket.on("product:lowStock", (item) => {
      queryClient.setQueryData(["admin-stats"], (old) => {
        if (!old) return old;
        const s = old.data.data;
        return {
          ...old,
          data: {
            data: {
              ...s,
              lowStockItems: [...s.lowStockItems, item],
            },
          },
        };
      });

      if (isAdminPage)
        handleSuccess(`Low Stock — ${item.name} (${item.stock} left)`);
    });

    return () => {
      socket.off("order:new");
      socket.off("order:statusUpdated");
      socket.off("product:lowStock");
      console.log("%c❌ Socket listeners cleaned", "color:red");
    };
  }, [queryClient, isAdminPage]);
}
