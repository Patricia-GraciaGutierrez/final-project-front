import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { AuthContext } from "../../../context/auth.context";
import projectService from "../../../services/project.service";

function Projects() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate(); // Usar useNavigate para la navegación

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getAllProjectsByUserId(user._id);
        setProjects(response.data);
        setFormData(response.data.length > 0 ? response.data : [getEmptyProject()]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [user._id]);

  const getEmptyProject = () => ({
    title: "",
    description: "",
    technologies: [],
    link: "",
    images: [],
  });

  const handleInputChange = (index, field, value) => {
    const updatedProjects = [...formData];
    updatedProjects[index][field] = value;
    setFormData(updatedProjects);
  };

  const handleTechnologiesChange = (index, value) => {
    const updatedProjects = [...formData];
    updatedProjects[index].technologies = value.split(", ").filter(tech => tech.trim() !== "");
    setFormData(updatedProjects);
  };

  const handleImagesChange = (index, value) => {
    const updatedProjects = [...formData];
    updatedProjects[index].images = value.split(", ").filter(img => img.trim() !== "");
    setFormData(updatedProjects);
  };

  const addProject = () => {
    setFormData([...formData, getEmptyProject()]);
  };

  const removeProject = (index) => {
    if (formData.length <= 1) return; // Mantener al menos un elemento
    
    const updatedProjects = [...formData];
    updatedProjects.splice(index, 1);
    setFormData(updatedProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Delete all existing projects
      for (const project of projects) {
        await projectService.deleteProject(project._id);
      }
      
      // Create all new projects
      for (const project of formData) {
        if (project.title.trim() !== "") {
          await projectService.createProject({ ...project, userId: user._id });
        }
      }
      
      // Refresh projects list
      const response = await projectService.getAllProjectsByUserId(user._id);
      setProjects(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar todos tus proyectos?")) {
      setLoading(true);
      try {
        for (const project of projects) {
          await projectService.deleteProject(project._id);
        }
        setProjects([]);
        setFormData([getEmptyProject()]);
        setIsEditing(false);
      } catch (error) {
        console.error("Error deleting projects:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Función para ir a la siguiente sección
  const goToNextSection = () => {
    // Si hay cambios sin guardar y está en modo edición, se podría mostrar una confirmación
    if (isEditing) {
      // Opción 1: Guardar automáticamente
      handleSubmit({ preventDefault: () => {} });
      // Opción 2: Preguntar al usuario (implementar según necesidad)
    }
    navigate("/dashboard/contact"); // Redirigir a "Contacto"
  };

  // Función para ir a la sección anterior
  const goToPreviousSection = () => {
    navigate("/dashboard/curriculum"); // Redirigir a "Curriculum"
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-indigo-500 text-center mb-8">Mis proyectos</h2>
      {loading ? (
        <p className="text-gray-500 text-left px-4">Cargando...</p>
      ) : projects.length > 0 && !isEditing ? (
        <div className="mt-4 px-12">
          {projects.map((project, index) => (
            <div key={index} className="border-b pb-2 mt-2">
              <h3 className="text-xl font-semibold text-left  text-gray-900">{project.title}</h3>
              <p className="text-left my-2  text-gray-900">{project.description}</p>
              <p className="text-left my-2  text-gray-900"><strong>Tecnologías:</strong> {project.technologies.join(", ")}</p>
              {project.link && (
                <p className="text-left my-2  text-gray-950">
                  <strong>Enlace:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">{project.link}</a>
                </p>
              )}
              {project.images && project.images.length > 0 && project.images[0] && (
                <div className="mt-2 mb-4">
                  <strong className="text-left block  text-gray-900">Imágenes:</strong>
                  <div className="flex gap-2 mt-1 overflow-x-auto">
                    {project.images.map((img, idx) => (
                      img && (
                        <img 
                          key={idx} 
                          src={img} 
                          alt={`${project.title} ${idx + 1}`}
                          className="h-24 w-auto object-cover rounded  text-gray-900"
                        />
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="mt-12 flex justify-center">
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-6 w-24 hover:bg-indigo-600 transition-colors duration-200"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
            <button
              className="bg-white border-2 border-red-500 text-red-500 px-4 py-2 rounded-md w-24 hover:bg-red-50 transition-colors duration-200"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-between mt-16">
            <button
              type="button"
              onClick={goToPreviousSection}
              className="flex items-center px-4 py-2 rounded-md bg-indigo-100 text-indigo-500 hover:bg-indigo-200 transition-colors duration-200"
            >
              <svg className="mr-2 h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button 
              onClick={goToNextSection}
              className="flex items-center px-4 py-2 rounded-md bg-indigo-100 text-indigo-500 hover:bg-indigo-200 transition-colors duration-200"
            >
              <svg className="ml-2 h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 px-8">
          {formData.map((project, index) => (
            <div key={index} className="border-b pb-4 mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-400 text-left">Proyecto {index + 1}</span>
                {formData.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="bg-white border-2 border-red-500 text-red-500 px-4 py-2 rounded-md w-18 hover:bg-red-50 transition-colors duration-200"
                  >
                    -
                  </button>
                )}
              </div>
              
              <label className="block text-gray-700 font-black text-lg text-left mt-4 mb-2">Título</label>
              <input 
                type="text" 
                value={project.title} 
                onChange={(e) => handleInputChange(index, "title", e.target.value)} 
                className="w-full border rounded-md p-2 text-left  text-gray-950"
                placeholder="Nombre del proyecto" 
              />

              <label className="block text-gray-700 font-black text-lg text-left mt-4 mb-2">Descripción</label>
              <textarea 
                value={project.description} 
                onChange={(e) => handleInputChange(index, "description", e.target.value)} 
                className="w-full border rounded-md p-2 min-h-24 text-left  text-gray-950"
                placeholder="Describe brevemente tu proyecto y su propósito" 
              />

              <label className="block text-gray-700 font-black text-lg text-left mt-4 mb-2">Tecnologías (separadas por coma)</label>
              <input 
                type="text" 
                value={project.technologies.join(", ")} 
                onChange={(e) => handleTechnologiesChange(index, e.target.value)} 
                className="w-full border rounded-md p-2 text-left  text-gray-950"
                placeholder="React, Node.js, MongoDB..." 
              />

              <label className="block text-gray-700 font-black text-lg text-left mt-4 mb-2">Enlace</label>
              <input 
                type="url" 
                value={project.link} 
                onChange={(e) => handleInputChange(index, "link", e.target.value)} 
                className="w-full border rounded-md p-2 text-left  text-gray-950"
                placeholder="https://..." 
              />

              <label className="block text-gray-700 font-black text-lg text-left mt-4 mb-2">Imágenes (URLs, separadas por coma)</label>
              <input 
                type="text" 
                value={project.images.join(", ")} 
                onChange={(e) => handleImagesChange(index, e.target.value)} 
                className="w-full border rounded-md p-2 text-left  text-gray-950"
                placeholder="https://ejemplo.com/imagen1.jpg, https://ejemplo.com/imagen2.jpg" 
              />
            </div>
          ))}

          <div className="mt-8 mb-4 flex justify-between items-center">
            <h3 className="text-gray-700 font-black text-lg text-left">Proyectos</h3>
            <button
              type="button"
              onClick={addProject}
              className="bg-indigo-500 text-white w-8 h-8 rounded-full text-lg font-bold hover:bg-indigo-600 transition-colors duration-200"
            >
              +
            </button>
          </div>

          {/* Botones de Guardar y Cancelar */}
          <div className="mt-20 flex justify-between">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-200"
            >
              {projects.length > 0 ? "Guardar" : "Crear"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Projects;