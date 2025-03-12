import { useState, useEffect, useContext } from "react";
import userService from "../../../services/user.services";
import { AuthContext } from "../../../context/auth.context"; 

export default function Info() {
  const [formData, setFormData] = useState({ info: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user._id) {
      setLoading(true);
      userService.getUserById(user._id)
        .then((response) => {
          const data = response.data;
          if (data && data.info) {
            setFormData({ info: data.info });  // Se asegura de usar formData
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener información:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user && user._id) {
      userService.updateUser(user._id, { info: formData.info }) // Usar formData.info
        .then(() => {
          setIsEditing(false);  // Se sale del modo edición
        })
        .catch(error => console.error("Error al actualizar:", error));
    }
  };

  const handleDelete = () => {
    if (formData.info) {
      userService.deleteInfo(user._id, formData.info) // Usamos user._id y formData.info
        .then(() => {
          setFormData({ info: "" }); // Limpiamos la información después de eliminar
          setIsEditing(false); // Salimos del modo edición
        })
        .catch(error => console.error("Error al eliminar:", error));
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-indigo-500">Bio</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="space-y-2">
          <p><strong>Info:</strong></p>
          {isEditing ? (
            <>
              <textarea
                name="info" // Vinculado a formData.info
                value={formData.info} // Utiliza formData.info
                onChange={handleChange}
                placeholder="Información personal"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
              
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Guardar
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-700">{formData.info || "No hay información disponible"}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Editar
              </button>
              {/* Botón para eliminar solo cuando no esté editando */}
              {formData.info && (
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
