import { Link } from "react-router-dom";
import "./Home.css";
import bg from "./../../assets/fondo.png"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-6 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 animate-custom-fade-in">
          Crea y Comparte tu Página Profesional
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Diseña tu CV y portfolio con una plantilla optimizada y compártelo con un solo clic.
        </p>
        <Link
          to="/signup"
          className="bg-purple-950 text-white btn btn-primary btn-lg p-4 hover:scale-105 transition-transform"
        >
          Empieza Ahora
        </Link>
      </div>

      {/* Imagen o Ilustración */}
      <div className="mt-12 max-w-4xl">
        <img
          src= {bg}
          alt="Portfolio Profesional"
          className="rounded-lg shadow-2xl animate-custom-fade-in-up"
        />
      </div>

      {/* Features Section */}
      <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl">
        <div className="text-center p-8 shadow-xl rounded-lg bg-white hover:shadow-2xl transition-shadow duration-300 animate-custom-fade-in-up">
          <div className="text-4xl mb-4 text-primary">🚀</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fácil de Usar</h2>
          <p className="text-gray-600">
            Edita tu información en pocos pasos y obtén un diseño profesional.
          </p>
        </div>
        <div className="text-center p-8 shadow-xl rounded-lg bg-white hover:shadow-2xl transition-shadow duration-300 animate-custom-fade-in-up delay-100">
          <div className="text-4xl mb-4 text-secondary">🎨</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Personalizable</h2>
          <p className="text-gray-600">
            Elige colores y estilos que reflejen tu identidad.
          </p>
        </div>
        <div className="text-center p-8 shadow-xl rounded-lg bg-white hover:shadow-2xl transition-shadow duration-300 animate-custom-fade-in-up delay-200">
          <div className="text-4xl mb-4 text-accent">🔗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Comparte con un Link</h2>
          <p className="text-gray-600">
            Publica y comparte tu portfolio con un enlace único.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center bg-white p-8 rounded-lg shadow-2xl animate-custom-fade-in delay-300">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          ¿Listo para destacar?
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Empieza a crear tu portfolio hoy mismo.
        </p>
        <Link
          to="/signup"
          className="btn btn-secondary btn-lg hover:scale-105 transition-transform"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}