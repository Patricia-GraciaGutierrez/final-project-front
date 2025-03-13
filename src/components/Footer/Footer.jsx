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
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-indigo-400 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-indigo-400 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-indigo-400 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                </svg>
              </a>
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