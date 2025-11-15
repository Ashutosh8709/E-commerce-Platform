import api from "./api";

export const register = (formData) => {
  return api.post("/seller/register", formData);
};

export const addBank = (formData) => {
  return api.post("/seller/addBank", formData);
};
