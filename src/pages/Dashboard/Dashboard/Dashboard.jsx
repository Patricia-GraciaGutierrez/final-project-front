import { Link, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import { useContext, useState } from "react";

function Dashboard() {
  const location = useLocation(); // Para detectar la ruta activa
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Función para determinar si un enlace está activo
  const isActive = (path) => {
    return location.pathname === `/dashboard${path}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      {/* Menú de edición */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          {/* Versión desktop */}
          <nav className="hidden md:flex justify-between items-center">
            <div className="flex space-x-8">
              <Link
                to="/dashboard/info"
                className={`text-lg font-semibold ${isActive("/info")
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "text-gray-700 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500"
                  } transition-colors`}
              >
                Info
              </Link>
              <Link
                to="/dashboard/curriculum"
                className={`text-lg font-semibold ${isActive("/curriculum")
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "text-gray-700 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500"
                  } transition-colors`}
              >
                Curriculum
              </Link>
              <Link
                to="/dashboard/projects"
                className={`text-lg font-semibold ${isActive("/projects")
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "text-gray-700 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500"
                  } transition-colors`}
              >
                Projects
              </Link>
              <Link
                to="/dashboard/contact"
                className={`text-lg font-semibold ${isActive("/contact")
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "text-gray-700 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500"
                  } transition-colors`}
              >
                Contact
              </Link>
            </div>
            <Link
              to={`/paginaprofesional/${user?._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-lg font-semibold px-4 py-2 rounded-lg ${isActive("/preview")
                ? "bg-indigo-600 text-white"
                : "bg-indigo-100 text-indigo-500 hover:bg-indigo-200"
                } transition-colors`}
            >
              Preview
            </Link>
          </nav>
          
          {/* Versión móvil */}
          <div className="md:hidden">
            <div className="flex justify-between items-center">
              {/* Nuevo icono para el menú de secciones */}
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {menuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  )}
                </svg>
              </button>
              
              {/* Botón de Preview siempre visible */}
              <Link
                to={`/paginaprofesional/${user?._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-semibold px-3 py-1 rounded-lg ${isActive("/preview")
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-100 text-indigo-500 hover:bg-indigo-200"
                  } transition-colors`}
              >
                Preview
              </Link>
            </div>
            
            {/* Menú desplegable móvil */}
            {menuOpen && (
              <div className="mt-4 space-y-2 pb-2">
                <Link
                  to="/dashboard/info"
                  className={`block py-2 px-2 rounded ${isActive("/info")
                    ? "bg-indigo-50 text-indigo-500"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Info
                </Link>
                <Link
                  to="/dashboard/curriculum"
                  className={`block py-2 px-2 rounded ${isActive("/curriculum")
                    ? "bg-indigo-50 text-indigo-500"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Curriculum
                </Link>
                <Link
                  to="/dashboard/projects"
                  className={`block py-2 px-2 rounded ${isActive("/projects")
                    ? "bg-indigo-50 text-indigo-500"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  to="/dashboard/contact"
                  className={`block py-2 px-2 rounded ${isActive("/contact")
                    ? "bg-indigo-50 text-indigo-500"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <Outlet /> {/* Aquí se renderizan las rutas anidadas */}
      </main>
    </div>
  );
}

export default Dashboard;