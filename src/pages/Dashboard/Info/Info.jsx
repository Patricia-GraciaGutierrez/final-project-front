import { useState, useEffect, useContext } from "react";
import userService from "../../../services/user.services"; // Ahora usamos userService
import { AuthContext } from "../../../context/auth.context"; 

export default function Info() {
  const [info, setInfo] = useState("");
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
            setInfo(data.info);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener información:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleSave = () => {
    if (user && user._id) {
      userService.updateUser(user._id, { info })
        .then((response) => {
          setInfo(response.data.info);
          setIsEditing(false);
        })
        .catch(error => console.error("Error al actualizar:", error));
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="space-y-2">
          {isEditing ? (
            <>
              <textarea
                value={info}
                onChange={(e) => setInfo(e.target.value)}
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
              <p className="text-gray-700">{info || "No hay información disponible"}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Editar
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
