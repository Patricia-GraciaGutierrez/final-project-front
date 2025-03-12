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
  
  getAllProjectsByUserId = (userId) => this.api.get(`/projects/user/${userId}`);
  getProjectById = (id) => this.api.get(`/projects/${id}`);
  createProject = (requestBody) => this.api.post("/projects", requestBody);
  updateProject = (id, requestBody) => this.api.put(`/projects/${id}`, requestBody);
  deleteProject = (id) => this.api.delete(`/projects/${id}`);
}

const projectService = new ProjectService();
export default projectService;