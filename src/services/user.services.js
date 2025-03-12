import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005/api",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });
  }

  getAllUsers = () => this.api.get("/users");
  getUserById = (id) => this.api.get(`/users/${id}`);
  getUserProfile = (id) => this.api.get(`/users/${id}/profile`);
  updateUser = (id, requestBody) => this.api.put(`/users/${id}`, requestBody);
  deleteUser = (id) => this.api.delete(`/users/${id}`);
}

const userService = new UserService();
export default userService;
