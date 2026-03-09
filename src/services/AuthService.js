import http from "./HttpService";
const login = (username, password) => {
  return http.post("/auth/login", { username, password });
};
const register = (user) => {
  return http.post("/auth/register", user);
};
const logout = () => {
  localStorage.removeItem("token");
};
const saveToken = (token) => {
  localStorage.setItem("token", token);
};
const AuthService = {
  login,
  register,
  logout,
  saveToken
};

export default AuthService;