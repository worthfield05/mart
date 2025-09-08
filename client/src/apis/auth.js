import API from "./axios";

export const login = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);
  return data;
};
export const register = async (credentials) => {
  const { data } = await API.post("/auth/register", credentials);
  return data;
};
export const currentUser = async () => {
  const { data } = await API.get("/auth/me");
  return data;
};
export const logout = async () => {
  const { data } = await API.post("/auth/logout");
  return data;
};

export const verifyEmail = async (token) => {
  const { data } = await API.post(`/auth/verify-email/${token}`);
  return data;
};

export const forgotPassword = async (credentials) => {
  const { data } = await API.post(`/auth/forgot-password`, {
    email: credentials,
  });
  return data;
};

export const resetPassword = async ({ token, password }) => {
  console.log(password);
  const { data } = await API.post(`/auth/reset-password/${token}`, {
    password,
  });
  return data;
};
