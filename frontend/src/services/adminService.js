import api from "./api";

export const getAllOrders = () => {
  return api.get("/admin/orders");
};

export const getAdminStats = () => {
  return api.get("/admin/stats");
};

export const getSalesAnalytics = () => {
  return api.get("/admin/analytics/sales");
};
