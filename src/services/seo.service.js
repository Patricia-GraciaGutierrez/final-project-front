import axios from "axios";

class SeoService {
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

  getSeoAnalysis = () => this.api.get(`/seo/seo-analysis`);
}

const seoService = new SeoService();
export default seoService;
