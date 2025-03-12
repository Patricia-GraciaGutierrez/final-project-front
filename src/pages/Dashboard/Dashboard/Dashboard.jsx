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
          <nav className="flex space-x-8">
            <Link
              to="/dashboard/info"
              className={`text-lg font-semibold ${
                isActive("/info")
                  ? "text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-700 hover:text-purple-700 hover:border-b-2 hover:border-purple-700"
              } transition-colors`}
            >
              Info
            </Link>
            <Link
              to="/dashboard/curriculum"
              className={`text-lg font-semibold ${
                isActive("/curriculum")
                  ? "text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-700 hover:text-purple-700 hover:border-b-2 hover:border-purple-700"
              } transition-colors`}
            >
              Curriculum
            </Link>
            <Link
              to="/dashboard/projects"
              className={`text-lg font-semibold ${
                isActive("/projects")
                  ? "text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-700 hover:text-purple-700 hover:border-b-2 hover:border-purple-700"
              } transition-colors`}
            >
              Projects
            </Link>
            <Link
              to="/dashboard/contact"
              className={`text-lg font-semibold ${
                isActive("/contact")
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
        <Outlet /> {/* Aquí se renderizan las rutas anidadas */}
      </main>
    </div>
  );
}

export default Dashboard;