import { useState, useEffect, useContext } from "react";
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

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-indigo-500">Curriculum</h2>
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : curriculum && !isEditing ? (
        <div className="mt-4">
          <p><strong>Bio:</strong> {curriculum.bio}</p>
          <p><strong>Skills:</strong> {curriculum.skills.join(", ")}</p>
          <p><strong>Location:</strong> {curriculum.location}</p>

          <h3 className="mt-4 text-xl font-semibold">Experience</h3>
          {curriculum.experience.map((exp, index) => (
            <div key={index} className="border-b pb-2 mt-2">
              <p><strong>{exp.title}</strong> at {exp.company}</p>
              <p>{exp.startDate} - {exp.endDate}</p>
              <p>{exp.description}</p>
            </div>
          ))}

          <h3 className="mt-4 text-xl font-semibold">Education</h3>
          {curriculum.education.map((edu, index) => (
            <div key={index} className="border-b pb-2 mt-2">
              <p><strong>{edu.degree}</strong> at {edu.institution}</p>
              <p>{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}

          <div className="mt-4">
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          />

          <label className="block text-gray-700 mt-2">Skills (separadas por coma)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills.join(", ")}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(", ") })}
            className="w-full border rounded-md p-2"
          />

          <label className="block text-gray-700 mt-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          />

          <h3 className="mt-4 text-lg font-semibold">Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="border-b pb-2 mt-2">
              <input
                type="text"
                placeholder="Title"
                value={exp.title}
                onChange={(e) => handleArrayChange(index, "title", e.target.value, "experience")}
                className="w-full border rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleArrayChange(index, "company", e.target.value, "experience")}
                className="w-full border rounded-md p-2 mt-2"
              />
            </div>
          ))}

          <h3 className="mt-4 text-lg font-semibold">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="border-b pb-2 mt-2">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleArrayChange(index, "degree", e.target.value, "education")}
                className="w-full border rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleArrayChange(index, "institution", e.target.value, "education")}
                className="w-full border rounded-md p-2 mt-2"
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4"
          >
            {curriculum ? "Actualizar" : "Crear"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Curriculum;
