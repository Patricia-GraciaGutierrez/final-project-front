import { useState, useEffect, useContext } from "react";
import userService from "../../../services/user.services";
import { AuthContext } from "../../../context/auth.context";

export default function Info() {
  const [formData, setFormData] = useState({ info: "", profession: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { user } = useContext(AuthContext);

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

  return (
    <div className="bg-white shadow-md rounded-lg p-6 pl-16 pr-16">
      <h2 className="text-2xl font-semibold text-indigo-500">Información personal</h2>
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : isEditing ? (
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-gray-700 font-black text-lg text-left mt-8 mb-4">Breve descripción</label>
          <textarea
            name="info"
            value={formData.info}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
            placeholder="Escribe unas dos o tres líneas sobre ti"
          />
          <label className="block text-gray-700 font-black text-lg text-left mt-8 mb-4">Profesión</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
            placeholder="¿A qué te dedicas?"
          />
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-600 transition-colors duration-200">Guardar</button>
        </form>
      ) : (
        <div className="mt-8">
          <p className="mb-4"><strong>Breve descipción:</strong> {formData.info}</p>
          <p><strong>Profesión:</strong> {formData.profession}</p>
          <div className="mt-12">
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-6 w-24 hover:bg-indigo-600 transition-colors duration-200" onClick={() => setIsEditing(true)}>Editar</button>
          <button className="bg-white border-2 border-red-500 text-red-500 px-4 py-2 rounded-md w-24 hover:bg-red-50 transition-colors duration-200" onClick={handleDelete}>Eliminar</button>
          </div>
        </div>
      )}
    </div>
  );
}
