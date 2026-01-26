import api from "./api";

export const loginUser = (email, password) => {
  return api.post("/users/login", { email, password });
};

export const signupUser = (formData) => {
  const form = new FormData();
  form.append("name", formData.name);
  form.append("email", formData.email);
  form.append("password", formData.password);
  if (formData.avatar) form.append("avatar", formData.avatar);

  return api.post("/users/register", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const logoutUser = () => {
  return api.post("/users/logout");
};

export const getUser = () => {
  return api.get("/users/current-user");
};

export const forgotUserPassword = (email, newPassword) => {
  return api.post("/users/forgot-password", { email, newPassword });
};

export const verifyUserEmail = (email) => {
  return api.post("/users/verify", { email });
};
