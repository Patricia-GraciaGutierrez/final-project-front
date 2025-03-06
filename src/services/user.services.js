import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005/api/users",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });
  }

  getAllUsers = () => this.api.get("/api/users");
  getUserById = (id) => this.api.get(`/api/users/${id}`);
  updateUser = (id, requestBody) => this.api.put(`/api/users/${id}`, requestBody);
  deleteUser = (id) => this.api.delete(`/api/users/${id}`);
}

const userService = new UserService();
export default userService;
