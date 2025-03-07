import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";

function Dashboard() {
  const { user, logOutUser } = useContext(AuthContext);
  const location = useLocation(); // Para detectar la ruta activa

  // Función para determinar si un enlace está activo
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold">
            MiPortfolio
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-purple-300">{user && user.name}</span>
            <button
              onClick={logOutUser}
              className="bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-purple-100 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Menú de edición */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex space-x-8">
            <Link
              to="/dashboard/info"
              className={`text-lg font-semibold ${
                isActive("/dashboard/info")
                  ? "text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-700 hover:text-purple-700 hover:border-b-2 hover:border-purple-700"
              } transition-colors`}
            >
              Info
            </Link>
            <Link
              to="/dashboard/experience"
              className={`text-lg font-semibold ${
                isActive("/dashboard/experience")
                  ? "text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-700 hover:text-purple-700 hover:border-b-2 hover:border-purple-700"
              } transition-colors`}
            >
              Experience
            </Link>
            <Link
              to="/dashboard/projects"
              className={`text-lg font-semibold ${
                isActive("/dashboard/projects")
                  ? "text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-700 hover:text-purple-700 hover:border-b-2 hover:border-purple-700"
              } transition-colors`}
            >
              Projects
            </Link>
            <Link
              to="/dashboard/contact"
              className={`text-lg font-semibold ${
                isActive("/dashboard/contact")
                  ? "text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-700 hover:text-purple-700 hover:border-b-2 hover:border-purple-700"
              } transition-colors`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isActive("/dashboard/info") && "Editar Información Personal"}
            {isActive("/dashboard/experience") && "Editar Experiencia"}
            {isActive("/dashboard/projects") && "Editar Proyectos"}
            {isActive("/dashboard/contact") && "Editar Contacto"}
          </h2>

          {/* Formulario o contenido dinámico */}
          <div className="space-y-6">
            <p className="text-gray-700">
              Aquí puedes editar la información correspondiente.
            </p>
            {/* Ejemplo de formulario */}
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
                  placeholder="Ingresa tu nombre"
                />
              </div>
              <div>
                <label className="block text-gray-700">Descripción</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
                  placeholder="Ingresa una descripción"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;