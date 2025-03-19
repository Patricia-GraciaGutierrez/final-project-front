import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/user.services";
import { AuthContext } from "../../../context/auth.context";

export default function Info() {
  const [formData, setFormData] = useState({ info: "", profession: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      setLoading(true);
      userService.getUserById(user._id)
        .then((response) => {
          const data = response.data;
          if (data) {
            setFormData({
              info: data.info || "",
              profession: data.profession || ""
            });
          }
        })
        .catch((error) => console.error("Error fetching user info:", error))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    userService.updateUser(user._id, formData)
      .then(() => setIsEditing(false))
      .catch((error) => console.error("Error updating user info:", error))
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    if (!user) return;
    setLoading(true);
    userService.deleteUser(user._id)
      .then(() => {
        setFormData({ info: "", profession: "" });
        setIsEditing(false);
      })
      .catch((error) => console.error("Error deleting user info:", error))
      .finally(() => setLoading(false));
  };

  // Función para ir a la siguiente sección
  const goToNextSection = () => {
    // Si hay cambios sin guardar y está en modo edición, se podría mostrar una confirmación
    if (isEditing) {
      // Opción 1: Guardar automáticamente
      handleSubmit({ preventDefault: () => {} });
      // Opción 2: Preguntar al usuario (implementar según necesidad)
    }
    navigate("/dashboard/curriculum");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 pl-16 pr-16">
      <h2 className="text-2xl font-semibold text-indigo-500 text-center">Información personal</h2>
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : isEditing ? (
        <form onSubmit={handleSubmit} className="mt-4 text-left">
          <label className="block text-gray-700 font-black text-lg text-left mt-8 mb-4">Breve descripción</label>
          <textarea
            name="info"
            value={formData.info}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2  text-gray-950"
            placeholder="Escribe unas dos o tres líneas sobre ti"
          />
          <label className="block text-gray-700 font-black text-lg text-left mt-8 mb-4">Profesión</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2  text-gray-950"
            placeholder="¿A qué te dedicas?"
          />
          <div className="flex justify-between mt-4">
          <button 
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-200">
              Guardar
              </button>
            
          </div>
        </form>
      ) : (
        <div className="mt-8">
          <p className="mb-4 text-left"><strong>Breve descipción:</strong> {formData.info}</p>
          <p className="text-left"><strong>Profesión:</strong> {formData.profession}</p>
          
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
            {/* Botón "Atrás" - Desactivado en la primera sección */}
            <button
              type="button"
              className="flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
              disabled
            >
              <svg className="mr-2 h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            {/* Botón Siguiente */}
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
      )}
    </div>
  );
}