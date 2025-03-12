import { Link, useLocation, Outlet } from "react-router-dom";

function Dashboard() {
  const location = useLocation(); // Para detectar la ruta activa

  // Función para determinar si un enlace está activo
  const isActive = (path) => {
    return location.pathname === `/dashboard${path}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      {/* Menú de edición */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
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
              to="/dashboard/curriculum/preview"
              className={`text-lg font-semibold px-4 py-2 rounded-lg ${isActive("/preview")
                ? "bg-indigo-600 text-white"
                : "bg-indigo-100 text-indigo-500 hover:bg-indigo-200"
                } transition-colors`}
            >
              Preview
            </Link>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="container mx-auto px-6 py-8">
        <Outlet /> {/* Aquí se renderizan las rutas anidadas */}
      </main>
    </div>
  );
}

export default Dashboard;