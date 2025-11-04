import api from "./api";

export const getUserOrders = () => {
  return api.get("/order/user");
};

export const getById = (id) => {
  return api.get(`/order/${id}`);
};

export const cancel = (id) => {
  return api.patch(`/order/${id}/cancel`);
};

export const updateStatus = () => {};

export const getAllOrders = () => {};

export const getSales = () => {};

export const returnOrder = () => {};

export const reorder = () => {};

export const autoCancel = () => {};

export const getRevenue = () => {};
