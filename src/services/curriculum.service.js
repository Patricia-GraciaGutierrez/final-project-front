import axios from "axios";

class CurriculumService {
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

  getCurriculumByUserId = (userId) => this.api.get(`/curriculum/user/${userId}`);
  createCurriculum = (requestBody) => this.api.post("/curriculum", requestBody);
  updateCurriculum = (id, requestBody) => this.api.put(`/curriculum/${id}`, requestBody);
  deleteCurriculum = (id) => this.api.delete(`/curriculum/${id}`);
}

const curriculumService = new CurriculumService();
export default curriculumService;

