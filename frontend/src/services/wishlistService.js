import api from "./api";

export const add = (productId, color, size) => {
  return api.post(`/wishlist/${productId}`, { color, size });
};

export const get = () => {
  return api.get("/wishlist");
};

export const remove = (productId) => {
  return api.delete(`/wishlist/${productId}`);
};

export const clear = () => {
  return api.delete("/wishlist");
};

export const addCart = (productId) => {
  return api.post(`/wishlist/${productId}/move-to-cart`);
};
