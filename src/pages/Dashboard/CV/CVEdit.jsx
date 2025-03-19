import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import curriculumService from "../../../services/curriculum.service";

function Curriculum() {
  const { user } = useContext(AuthContext);
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    skills: [],
    experience: [{ title: "", company: "", startDate: "", endDate: "", description: "" }],
    education: [{ degree: "", institution: "", startDate: "", endDate: "" }],
    location: "",
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const response = await curriculumService.getCurriculumByUserId(user._id);
        if (response.data) {
          setCurriculum(response.data);
          setFormData(response.data); // Rellenar el formulario si hay datos
        }
      } catch (error) {
        console.error("Error fetching curriculum:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculum();
  }, [user._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, field, value, arrayName) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index][field] = value;
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const addArrayItem = (arrayName) => {
    if (arrayName === "experience") {
      setFormData({
        ...formData,
        experience: [
          ...formData.experience,
          { title: "", company: "", startDate: "", endDate: "", description: "" }
        ]
      });
    } else if (arrayName === "education") {
      setFormData({
        ...formData,
        education: [
          ...formData.education,
          { degree: "", institution: "", startDate: "", endDate: "" }
        ]
      });
    }
  };

  const removeArrayItem = (arrayName, index) => {
    if (formData[arrayName].length <= 1) return; // Mantener al menos un elemento

    const updatedArray = [...formData[arrayName]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (curriculum) {
        await curriculumService.updateCurriculum(curriculum._id, formData);
        setCurriculum(formData); // Actualizar los datos del curriculum
      } else {
        await curriculumService.createCurriculum({ ...formData, userId: user._id });
        setCurriculum(formData); // Crear el curriculum
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving curriculum:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!curriculum) return;
    setLoading(true);
    try {
      await curriculumService.deleteCurriculum(curriculum._id);
      setCurriculum(null); // Eliminar el curriculum
      setFormData({
        bio: "",
        skills: [],
        experience: [{ title: "", company: "", startDate: "", endDate: "", description: "" }],
        education: [{ degree: "", institution: "", startDate: "", endDate: "" }],
        location: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error deleting curriculum:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Funciones de navegación
  const goToPreviousSection = () => {
    navigate("/dashboard/info");
  };
  
  const goToNextSection = () => {
    navigate("/dashboard/projects");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 pl-16 pr-16">
      <h2 className="text-2xl font-semibold text-indigo-500 text-center mb-6">Curriculum</h2>
      {loading ? (
        <p className="text-gray-500 text-left">Cargando...</p>
      ) : curriculum && !isEditing ? (
        <div className="mt-4 text-left">
          <p className="mb-4"><strong>Resumen profesional:</strong> {curriculum.bio}</p>
          <p className="mb-4"><strong>Skills:</strong> {curriculum.skills.join(", ")}</p>
          <p className="mb-4"><strong>Residencia actual:</strong> {curriculum.location}</p>

          <h3 className="mt-8 mb-4 text-xl underline text-slate-800 font-semibold">Experiencia</h3>
          {curriculum.experience.map((exp, index) => (
            <div key={index} className="border-b pb-4 mt-4 mb-4">
              <p className="mb-2"><strong>{exp.title}</strong> at {exp.company}</p>
              <p className="mb-2">{exp.startDate} - {exp.endDate}</p>
              <p className="mb-2">{exp.description}</p>
            </div>
          ))}

          <h3 className="mt-8 mb-4 text-xl font-semibold underline text-slate-800">Educación</h3>
          {curriculum.education.map((edu, index) => (
            <div key={index} className="border-b pb-4 mt-4 mb-4">
              <p className="mb-2"><strong>{edu.degree}</strong> at {edu.institution}</p>
              <p className="mb-2">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}

          {/* Botones de Editar y Eliminar centrados */}
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
          
          {/* Botones de navegación separados - Solo en vista de información */}
          <div className="flex justify-between mt-16">
            {/* Botón "Atrás" - Navega a la sección de info */}
            <button
              type="button"
              onClick={goToPreviousSection}
              className="flex items-center px-4 py-2 rounded-md bg-indigo-100 text-indigo-500 hover:bg-indigo-200 transition-colors duration-200"
            >
              <svg className="mr-2 h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            {/* Botón Siguiente - Navega a la sección de proyectos */}
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
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-gray-700 font-black text-lg text-left mt-8 mb-4">Resumen profesional</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full border rounded-md p-3 text-left  text-gray-950"
            placeholder="Escribe un breve resumen sobre tu experiencia profesional de unas 4 líneas"
          />

          <label className="block text-gray-700 font-black text-lg text-left mt-8 mb-4">Skills (separadas por coma)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills.join(", ")}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(", ") })}
            className="w-full border rounded-md p-3 text-left  text-gray-950"
            placeholder="E.j.- Photoshop, Office..."
          />

          <label className="block text-gray-700 font-black text-lg text-left mt-8 mb-4">Lugar de residencia</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full border rounded-md p-3 text-left  text-gray-950"
            placeholder="¿Dónde tienes tu residencia habitual?"
          />

          <div className="mt-10 mb-6 flex justify-between items-center">
            <h3 className="text-gray-700 font-black text-lg text-left">Experiencia</h3>
            <button
              type="button"
              onClick={() => addArrayItem("experience")}
              className="bg-indigo-500 text-white w-8 h-8 rounded-full text-lg font-bold hover:bg-indigo-600 transition-colors duration-200"
            >
              +
            </button>
          </div>
          
          {formData.experience.map((exp, index) => (
            <div key={index} className="border-b pb-6 mt-4 text-left mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-slate-400">Experiencia {index + 1}</span>
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("experience", index)}
                    className="bg-white border-2 border-red-500 text-red-500 px-4 py-2 rounded-md w-18 hover:bg-red-50 transition-colors duration-200"
                  >
                    -
                  </button>
                )}
              </div>
              
              <input
                type="text"
                value={exp.title}
                onChange={(e) => handleArrayChange(index, "title", e.target.value, "experience")}
                className="w-full border rounded-md p-3 text-left mb-3  text-gray-950"
                placeholder="Puesto de trabajo"
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleArrayChange(index, "company", e.target.value, "experience")}
                className="w-full border rounded-md p-3 mt-3 text-left mb-3  text-gray-950"
                placeholder="Nombre de la empresa"
              />
              <div className="flex gap-3 mt-3 mb-3">
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleArrayChange(index, "startDate", e.target.value, "experience")}
                  className="w-1/2 border rounded-md p-3 text-left  text-gray-950"
                  placeholder="Fecha inicio"
                />
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleArrayChange(index, "endDate", e.target.value, "experience")}
                  className="w-1/2 border rounded-md p-3 text-left  text-gray-950"
                  placeholder="Fecha fin"
                />
              </div>
              <textarea
                value={exp.description}
                onChange={(e) => handleArrayChange(index, "description", e.target.value, "experience")}
                className="w-full border rounded-md p-3 mt-3 text-left  text-gray-950"
                placeholder="Describe, resumidamente, las funciones que realizaste"
              />
            </div>
          ))}

          <div className="mt-10 mb-6 flex justify-between items-center">
            <h3 className=" text-gray-700 font-black text-lg text-left">Education</h3>
            <button
              type="button"
              onClick={() => addArrayItem("education")}
              className="bg-indigo-500 text-white w-8 h-8 rounded-full text-lg font-bold hover:bg-indigo-600 transition-colors duration-200"
            >
              +
            </button>
          </div>
          
          {formData.education.map((edu, index) => (
            <div key={index} className="border-b pb-6 mt-4 text-left mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-slate-400">Educación {index + 1}</span>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("education", index)}
                    className="bg-white border-2 border-red-500 text-red-500 px-4 py-2 rounded-md w-18 hover:bg-red-50 transition-colors duration-200"
                  >
                    -
                  </button>
                )}
              </div>
              
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleArrayChange(index, "degree", e.target.value, "education")}
                className="w-full border rounded-md p-3 text-left mb-3  text-gray-950"
                placeholder="Título"
              />
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleArrayChange(index, "institution", e.target.value, "education")}
                className="w-full border rounded-md p-3 mt-3 text-left mb-3  text-gray-950"
                placeholder="Institución"
              />
              <div className="flex gap-3 mt-3">
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => handleArrayChange(index, "startDate", e.target.value, "education")}
                  className="w-1/2 border rounded-md p-3 text-left  text-gray-950"
                  placeholder="Fecha inicio"
                />
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => handleArrayChange(index, "endDate", e.target.value, "education")}
                  className="w-1/2 border rounded-md p-3 text-left  text-gray-950"
                  placeholder="Fecha fin"
                />
              </div>
            </div>
          ))}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-200"
            >
              {curriculum ? "Guardar" : "Crear"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Curriculum;