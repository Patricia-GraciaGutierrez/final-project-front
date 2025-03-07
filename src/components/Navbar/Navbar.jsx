import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-purple-950 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          MiPortfolio
        </Link>

        {/* Enlaces (versión escritorio) */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="hover:text-purple-300 transition-colors">
            Inicio
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/api/dashboard"
                className="hover:text-purple-300 transition-colors"
              >
                Panel de diseño
              </Link>
              <button
                onClick={logOutUser}
                className="bg-white text-purple-950 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors"
              >
                Cerrar Sesión
              </button>
              <span className="text-purple-300">{user && user.name}</span>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link
                to="/signup"
                className="bg-white text-purple-950 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors"
              >
                Registrarse
              </Link>
              <Link
                to="/login"
                className="bg-white text-purple-950 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors"
              >
                Iniciar Sesión
              </Link>
            </>
          )}
        </div>

        {/* Botón de hamburguesa (versión móvil) */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Abrir menú"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/s"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Fondo oscuro semitransparente (solo en móviles) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Menú móvil desplegable con animación de deslizamiento */}
      <div
        className={`md:hidden fixed inset-x-0 top-0 bg-purple-950 z-50 transform ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="block py-2 px-4 hover:bg-purple-700 transition-colors"
            onClick={toggleMenu}
          >
            Inicio
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/api/dashboard"
                className="block py-2 px-4 hover:bg-purple-700 transition-colors"
                onClick={toggleMenu}
              >
                Panel de diseño
              </Link>
              <button
                onClick={() => {
                  logOutUser();
                  toggleMenu();
                }}
                className="block w-full text-left py-2 px-4 hover:bg-purple-700 transition-colors"
              >
                Cerrar Sesión
              </button>
              <span className="block py-2 px-4 text-purple-300">
                {user && user.name}
              </span>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link
                to="/signup"
                className="block py-2 px-4 hover:bg-purple-700 transition-colors"
                onClick={toggleMenu}
              >
                Registrarse
              </Link>
              <Link
                to="/login"
                className="block py-2 px-4 hover:bg-purple-700 transition-colors"
                onClick={toggleMenu}
              >
                Iniciar Sesión
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;