import { Link, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import { useContext, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const location = useLocation(); 
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === `/dashboard${path}`;

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="bg-white shadow-md pt-4">
        <div className="container mx-auto px-4 py-4">
          {/* Versión desktop */}
          <nav className="hidden md:flex justify-between items-center px-8">
            <div className="flex space-x-8">
              <Link to="/dashboard/info" className={`text-lg font-semibold ${isActive("/info") ? "text-indigo-500 border-b-2 border-indigo-500" : "text-gray-700 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500"} transition-colors`}>
                Info
              </Link>
              <Link to="/dashboard/curriculum" className={`text-lg font-semibold ${isActive("/curriculum") ? "text-indigo-500 border-b-2 border-indigo-500" : "text-gray-700 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500"} transition-colors`}>
                Curriculum
              </Link>
              <Link to="/dashboard/projects" className={`text-lg font-semibold ${isActive("/projects") ? "text-indigo-500 border-b-2 border-indigo-500" : "text-gray-700 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500"} transition-colors`}>
                Proyectos
              </Link>
              <Link to="/dashboard/contact" className={`text-lg font-semibold ${isActive("/contact") ? "text-indigo-500 border-b-2 border-indigo-500" : "text-gray-700 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500"} transition-colors`}>
                Contacto
              </Link>
            </div>

            {/* Contenedor de botones SEO y Preview */}
            <div className="flex space-x-4">
              <Link to={`/paginaprofesional/${user?._id}`} title="Haz clic para ver el diseño de tu curriculum" target="_blank" rel="noopener noreferrer" className={`text-lg font-semibold px-4 py-2 rounded-lg ${isActive("/preview") ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-500 hover:bg-indigo-200"} transition-colors`}>
                Preview
              </Link>
              <Link to="/dashboard/seo" title="Analiza tu perfil con IA en búsqueda de palabras clave" className="text-lg font-semibold px-4 py-2 rounded-lg bg-whit border-2 border-indigo-500 animate-glow hover:bg-yellow-50 hover:border-indigo-700 glowing-border">
                ✨
              </Link>
            </div>
          </nav>

          {/* Versión móvil */}
          <div className="md:hidden">
            <div className="flex justify-between items-center">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 focus:outline-none">
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />}
                </svg>
              </button>

              <div className="flex space-x-2">
                <Link to={`/paginaprofesional/${user?._id}`} target="_blank" rel="noopener noreferrer" className={`text-sm font-semibold px-3 py-1 rounded-lg ${isActive("/preview") ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-500 hover:bg-indigo-200"} transition-colors`}>
                  Preview
                </Link>
                <Link to="/dashboard/seo" className="block text-sm font-semibold px-3 py-1 rounded-lg bg-white border-2 border-indigo-500 hover:bg-yellow-50 hover:border-indigo-700 glowing-border">
                ✨
                </Link>
              </div>
            </div>

            {/* Menú desplegable móvil */}
            {menuOpen && (
              <div className="mt-4 space-y-2 pb-2">
                <Link to="/dashboard/info" className={`block py-2 px-2 rounded ${isActive("/info") ? "bg-indigo-50 text-indigo-500" : "text-gray-700 hover:bg-gray-50"}`} onClick={() => setMenuOpen(false)}>Info</Link>
                <Link to="/dashboard/curriculum" className={`block py-2 px-2 rounded ${isActive("/curriculum") ? "bg-indigo-50 text-indigo-500" : "text-gray-700 hover:bg-gray-50"}`} onClick={() => setMenuOpen(false)}>Curriculum</Link>
                <Link to="/dashboard/projects" className={`block py-2 px-2 rounded ${isActive("/projects") ? "bg-indigo-50 text-indigo-500" : "text-gray-700 hover:bg-gray-50"}`} onClick={() => setMenuOpen(false)}>Proyectos</Link>
                <Link to="/dashboard/contact" className={`block py-2 px-2 rounded ${isActive("/contact") ? "bg-indigo-50 text-indigo-500" : "text-gray-700 hover:bg-gray-50"}`} onClick={() => setMenuOpen(false)}>Contacto</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
