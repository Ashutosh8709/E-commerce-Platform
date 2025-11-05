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

export const returnOrder = () => {};

export const reorder = () => {};
