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

  getSeoAnalysis = () => {
    return this.api.get(`/seo/seo-analysis`)
      .catch((error) => {
        // Verifica si el error es 429 (límite de peticiones alcanzado)
        if (error.response && error.response.status === 429) {
          // Si es un error 429, retornamos un mensaje específico
          throw new Error("Has alcanzado el límite de peticiones. Inténtalo más tarde.");
        } else if (error.response) {
          // Manejo de otros errores (por ejemplo, 400, 500, etc.)
          throw new Error(error.response.data.message || "Error desconocido");
        } else {
          // En caso de error de conexión
          throw new Error("Error al conectar con el servidor.");
        }
      });
  };
}

const seoService = new SeoService();
export default seoService;
