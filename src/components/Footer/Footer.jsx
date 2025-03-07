import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white py-12">
      <div className="container mx-auto px-6">
        {/* Contenido del Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sección 1: Logo y descripción */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">MiPortfolio</h2>
            <p className="text-gray-300">
              Crea y comparte tu página profesional de manera fácil y rápida.
            </p>
          </div>

          {/* Sección 2: Enlaces rápidos */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-purple-300 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Sección 3: Contacto */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <ul className="text-gray-300 space-y-2">
              <li>Email: patriciagrguti@gmail.com</li>
              <li>Teléfono: +34 XXX XXX XXX</li>
              <li>Dirección: Calle Falsa 123, Las Palmas</li>
            </ul>
          </div>

          {/* Sección 4: Redes Sociales */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Sígueme</h3>
            <div className="flex-center">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-purple-300 transition-colors"
              >Github
              </a>
              < br/>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-purple-300 transition-colors"
              >Linkedin
              </a>
            </div>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="border-t border-purple-900 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} MiPortfolio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}