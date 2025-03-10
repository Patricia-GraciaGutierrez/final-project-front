import React, { useState, useEffect } from 'react';
import projectService from '../../../services/project.service'; // Importa el servicio

const Projects = ({ userId }) => {
  const [projects, setProjects] = useState([]); // Inicializa como array vacío
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [],
    link: '',
    images: [],
  });

  // Obtener todos los proyectos del usuario
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getAllProjects(); // Usa el servicio
        // Asegúrate de que la respuesta sea un array
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setProjects([]); // Si no es un array, inicializa como array vacío
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]); // En caso de error, inicializa como array vacío
      }
    };
    fetchProjects();
  }, [userId]);

  // Agregar un nuevo proyecto
  const handleAddProject = async () => {
    try {
      const requestBody = { ...newProject, userId }; // Asegúrate de incluir el userId
      const response = await projectService.createProject(requestBody); // Usa el servicio

      // Asegúrate de que la respuesta sea un objeto de proyecto
      if (response.data && typeof response.data === 'object') {
        setProjects([...projects, response.data]); // Agrega el nuevo proyecto al estado
      } else {
        console.error('Expected a project object but got:', response.data);
      }

      // Reinicia el formulario
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        link: '',
        images: [],
      });
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-indigo-500 mb-4">Projects</h2>
      <div className="space-y-4">
        <input
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Title"
        />
        <textarea
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Description"
        />
        <input
          value={newProject.link}
          onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Project Link"
        />
        <button
          onClick={handleAddProject}
          className="bg-indigo-500 text-white px-4 py-2 rounded"
        >
          Add Project
        </button>
      </div>
      <div className="mt-6">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-indigo-500">{project.title}</h3>
              <p className="text-gray-700 mt-2">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-indigo-500 hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-700">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;