import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-indigo-500/95 backdrop-blur-md shadow-lg py-2"
          : "bg-gradient-to-r from-indigo-600 to-indigo-500 py-4"
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white relative group overflow-hidden">
          <span className="relative z-10 group-hover:text-indigo-100 transition-colors duration-300">Pat<span className="text-indigo-200">Share</span></span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-200 group-hover:w-full transition-all duration-300"></span>
        </Link>

        <div className="hidden md:flex space-x-8 items-center">
          {isLoggedIn ? (
            <>
              {user && (
                <Link to="/dashboard/info" className="text-indigo-100 font-medium flex items-center">
                  <span className="h-8 w-8 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold mr-2">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  Hola, {user.name}
                </Link>
              )}
              <button
                onClick={logOutUser}
                className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full font-semibold border border-white/20 hover:bg-white hover:text-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="relative overflow-hidden group px-4 py-2">
                <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">
                  Iniciar Sesión
                </span>
                <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-indigo-400 to-indigo-300 transition-transform duration-300 rounded-full"></span>
              </Link>
              <Link to="/signup" className="relative inline-flex items-center justify-center overflow-hidden bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold group">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Registrarse
                </span>
                <span className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-indigo-400 to-indigo-300 transition-transform duration-300 rounded-full"></span>
              </Link>
            </>
          )}
        </div>

        <button onClick={toggleMenu} className="md:hidden focus:outline-none relative w-8 h-8 flex flex-col justify-center items-center" aria-label="Abrir menú">
          <span className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white my-1 transition-all duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </button>
      </div>

      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm" onClick={toggleMenu}></div>}

      <div className={`md:hidden fixed inset-x-0 top-0 bg-gradient-to-b from-indigo-600 to-indigo-500 z-50 h-screen transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-2xl font-bold text-white" onClick={toggleMenu}>Pat<span className="text-indigo-200">Share</span></Link>
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="block py-3 px-4 text-white text-lg border-b border-indigo-400 hover:bg-indigo-400/50 transition-colors rounded-lg" onClick={toggleMenu}>Iniciar Sesión</Link>
                <Link to="/signup" className="block py-3 px-4 text-white text-lg bg-indigo-400/30 hover:bg-indigo-400/50 transition-colors rounded-lg mt-4" onClick={toggleMenu}>Registrarse</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard/info" className="py-3 px-4 text-indigo-100 flex items-center" onClick={toggleMenu}>
                  <span className="h-10 w-10 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xl mr-3">
                    {user && user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-lg">{user && `Hola, ${user.name}`}</span>
                </Link>
                <button onClick={() => { logOutUser(); toggleMenu(); }} className="block w-full text-center py-3 px-4 text-white bg-indigo-400/30 hover:bg-indigo-400/50 transition-colors rounded-lg mt-4">Cerrar Sesión</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
