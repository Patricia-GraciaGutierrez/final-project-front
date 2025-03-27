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

  getSeoAnalysis = async () => {
    try {
      const response = await this.api.post("/seo/seo-analysis");
      return response.data;
    } catch (error) {
      console.error("Error en getSeoAnalysis:", error);

      if (error.response) {
        switch (error.response.status) {
          case 400:
            throw new Error("Datos inválidos. Verifica la información proporcionada.");
          case 429:
            throw new Error("Has alcanzado el límite de peticiones. Inténtalo más tarde.");
          case 500:
            throw new Error("Error interno del servidor. Inténtalo de nuevo más tarde.");
          default:
            throw new Error(error.response.data.message || "Error desconocido del servidor");
        }
      } else if (error.request) {
        throw new Error("No se pudo conectar con el servidor. Verifica tu conexión.");
      } else {
        throw new Error("Error al preparar la solicitud de análisis SEO.");
      }
    }
  };
}

const seoService = new SeoService();
export default seoService;