import api from "./api";

export const get = () => {
  return api.get("/address");
};

export const add = (addressData) => {
  const {
    name,
    phone,
    street,
    city,
    state,
    country,
    postalCode,
    label,
    isDefault,
  } = addressData;

  return api.post("/address", {
    name,
    phone,
    street,
    city,
    state,
    country,
    postalCode,
    label,
    isDefault,
  });
};

export const update = (addressId, addressData) => {
  return api.patch(`/address/${addressId}`, addressData);
};

export const remove = (addressId) => {
  return api.delete(`/address/${addressId}`);
};

export const markDefault = (addressId) => {
  return api.patch(`/address/${addressId}/default`);
};
