import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-indigo-600 to-indigo-500 text-white py-16 overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-indigo-400/20 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Contenido del Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Sección 1: Logo y descripción */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4 relative inline-block">
              Pat<span className="text-indigo-200">Share</span>
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-indigo-200 to-transparent"></span>
            </h2>
            <p className="text-gray-100 mt-4 text-left">
              Crea y comparte tu página profesional de manera fácil y rápida.
            </p>
            <div className="mt-6 flex justify-center md:justify-start space-x-4">
              
            </div>
          </div>

          {/* Sección 2: Enlaces rápidos */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-indigo-400 inline-block">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-100 hover:text-white transition-colors duration-300 flex items-center group text-left">
                  <span className="w-0 h-0.5 bg-indigo-300 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-100 hover:text-white transition-colors duration-300 flex items-center group text-left">
                  <span className="w-0 h-0.5 bg-indigo-300 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                  Características
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-100 hover:text-white transition-colors duration-300 flex items-center group text-left">
                  <span className="w-0 h-0.5 bg-indigo-300 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                  Precios
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-100 hover:text-white transition-colors duration-300 flex items-center group text-left">
                  <span className="w-0 h-0.5 bg-indigo-300 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Sección 3: Contacto */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-indigo-400 inline-block">Contacto</h3>
            <ul className="text-gray-100 space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 flex justify-center w-8">
                  <svg className="w-5 h-5 text-indigo-300 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span className="hover:text-white transition-colors duration-300 text-left ml-2">pgg.uxui@gmail.com</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 flex justify-center w-8">
                  <svg className="w-5 h-5 text-indigo-300 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <span className="hover:text-white transition-colors duration-300 text-left ml-2">+34 XXX XXX XXX</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 flex justify-center w-8">
                  <svg className="w-5 h-5 text-indigo-300 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <span className="hover:text-white transition-colors duration-300 text-left ml-2">Calle Falsa 123, Las Palmas</span>
              </li>
            </ul>
          </div>

          {/* Sección 4: Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-indigo-400 inline-block">Sígueme</h3>
            <p className="text-gray-100 mb-4 text-left">Mantente conectado para recibir las últimas actualizaciones.</p>
            <div className="flex justify-center md:justify-start space-x-4 mb-6 mt-4">
              <a
                href="https://www.linkedin.com/in/patriciagrgt"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 px-4 py-2 rounded-lg flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Derechos de autor con efecto de gradiente */}
        <div className="border-t border-indigo-500/50 mt-12 pt-8 text-center">
          <p className="text-gray-100 text-sm">
            &copy; {new Date().getFullYear()} <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-indigo-400 font-medium">PatShare</span>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}