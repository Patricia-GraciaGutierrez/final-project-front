import axios from 'axios';

class ExampleService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
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
  createProject = (projectData) => this.api.post("/api/projects", projectData);
  updateProject = (id, projectData) => this.api.put(`/api/projects/${id}`, projectData);
  deleteProject = (id) => this.api.delete(`/api/projects/${id}`);
}

const projectService = new ProjectService();
export default projectService;