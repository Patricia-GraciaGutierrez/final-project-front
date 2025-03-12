import axios from "axios";

class ContactService {
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
  
  getContactByUserId = (userId) => this.api.get(`/contact/user/${userId}`);
  createContact = (requestBody) => this.api.post("/contact", requestBody);
  updateContact = (id, requestBody) => this.api.put(`/contact/${id}`, requestBody);
  deleteContact = (id) => this.api.delete(`/contact/${id}`);
}

const contactService = new ContactService();
export default contactService;