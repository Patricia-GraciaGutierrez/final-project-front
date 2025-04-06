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

  // Método para obtener el perfil público de un usuario sin usar el interceptor
  getUserPublicProfile = (id) => {
    // Crear una instancia de axios que no use el interceptor
    const publicApi = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005/api",
    });
    return publicApi.get(`/users/${id}/profile`);
  };
}

const userService = new UserService();
export default userService;
