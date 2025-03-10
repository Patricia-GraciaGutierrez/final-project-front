import axios from "axios";

class ProfileService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005/api/profiles",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });
  }

  
  getAllProfiles = () => this.api.get("/api/profiles");
  getProfileById = (id) => this.api.get(`/api/profiles/${id}`);
  createProfile = (requestBody) => this.api.post("/api/profiles", requestBody);
  updateProfile = (id, requestBody) => this.api.put(`/api/profiles/${id}`, requestBody);
  deleteProfile = (id) => this.api.delete(`/api/profiles/${id}`);
}

const profileService = new ProfileService();
export default profileService;

