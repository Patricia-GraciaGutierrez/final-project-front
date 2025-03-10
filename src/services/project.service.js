import axios from 'axios';

class ProjectService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005/api/projects"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  getAllProjects = () => this.api.get("/api/projects");
  getProjectById = (id) => this.api.get(`/api/projects/${id}`);
  createProject = (requestBody) => this.api.post("/api/projects", requestBody);
  updateProject = (id, requestBody) => this.api.put(`/api/projects/${id}`, requestBody);
  deleteProject = (id) => this.api.delete(`/api/projects/${id}`);
}

const projectService = new ProjectService();
export default projectService;