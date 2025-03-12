import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import projectService from "../../../services/project.service";

function Project() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    link: "",
    images: [],
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getAllProjectsByUserId(user._id);
        setProjects(response.data); // Se asume que puedes tener múltiples proyectos
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await projectService.createProject({ ...formData, userId: user._id });
      // Luego de crear el proyecto, recargar la lista
      const response = await projectService.getAllProjectsByUserId(user._id);
      setProjects(response.data);
      setFormData({
        title: "",
        description: "",
        technologies: [],
        link: "",
        images: [],
      });
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    setLoading(true);
    try {
      await projectService.deleteProject(projectId);
      // Eliminar el proyecto de la lista sin necesidad de recargar todo
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-indigo-500">Mis Proyectos</h2>
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : (
        <div>
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={() => setIsEditing(true)}
          >
            Crear un nuevo proyecto
          </button>

          {isEditing && (
            <form onSubmit={handleSubmit} className="mt-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
              />

              <label className="block text-gray-700 mt-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
              />

              <label className="block text-gray-700 mt-2">Technologies (separadas por coma)</label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies.join(", ")}
                onChange={(e) =>
                  setFormData({ ...formData, technologies: e.target.value.split(", ") })
                }
                className="w-full border rounded-md p-2"
              />

              <label className="block text-gray-700 mt-2">Link</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
              />

              <label className="block text-gray-700 mt-2">Images (URLs, separadas por coma)</label>
              <input
                type="text"
                name="images"
                value={formData.images.join(", ")}
                onChange={(e) => setFormData({ ...formData, images: e.target.value.split(", ") })}
                className="w-full border rounded-md p-2"
              />

              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Crear Proyecto
              </button>
            </form>
          )}

          <div className="mt-4">
            {projects.map((project) => (
              <div key={project._id} className="border-b py-4">
                <h3 className="text-xl">{project.title}</h3>
                <p>{project.description}</p>
                <p><strong>Technologies:</strong> {project.technologies.join(", ")}</p>
                <p>
                  <strong>Link:</strong>{" "}
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.link}
                  </a>
                </p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDelete(project._id)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;
