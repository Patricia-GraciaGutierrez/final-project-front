import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import bg from "./../../assets/fondo.png";
import "./Home.css";


export default function Home() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    cta: false
  });

  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Mostrar hero automáticamente después de carga
    setTimeout(() => {
      setIsVisible(prev => ({ ...prev, hero: true }));
    }, 300);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === featuresRef.current && entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, features: true }));
          } else if (entry.target === ctaRef.current && entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, cta: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    // Guardar referencias a los elementos actuales para la limpieza
    const currentFeaturesRef = featuresRef.current;
    const currentCtaRef = ctaRef.current;

    if (currentFeaturesRef) observer.observe(currentFeaturesRef);
    if (currentCtaRef) observer.observe(currentCtaRef);

    return () => {
      if (currentFeaturesRef) observer.unobserve(currentFeaturesRef);
      if (currentCtaRef) observer.unobserve(currentCtaRef);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-indigo-600/5 blur-3xl animate-pulse"></div>
          <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 rounded-full bg-indigo-400/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className={`container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 relative z-10 transition-all duration-1000 transform ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Texto hero */}
            <div className="text-center md:text-left max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-500 leading-normal pb-2">
                Crea y comparte tu página profesional
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Diseña tu CV y portfolio con una plantilla optimizada y compártelo con un solo clic.
                <span className="block mt-3 text-indigo-600 font-medium">Impulsa tu carrera profesional hoy mismo.</span>
                <span className="block mt-2 text-sm md:text-base text-amber-500 items-center gap-2">
                  <svg className="w-5 h-5 inline-block bulb-animation" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
                  </svg>
                  Utiliza nuestra IA para recomendarte palabras clave que necesitas para destacar.
                </span>
              </p>

              <Link
                to="/signup"
                className="relative overflow-hidden group inline-flex items-center justify-center px-8 py-4 font-bold text-white rounded-lg bg-gradient-to-r from-indigo-800 to-indigo-500 shadow-lg shadow-indigo-500/20 transform transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/30"
              >

                <span className="relative z-10 ">Empieza Ahora</span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>

              </Link>
            </div>

            <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl transform transition-all duration-700 hover:rotate-1 hover:scale-105">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-500 blur-xl opacity-30 transform -rotate-3 scale-95"></div>
              <img
                src={bg}
                alt="Página Profesional"
                className="relative z-10 rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-300/20 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-indigo-400/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Espacio separador */}
      <div className="h-20 bg-gray-50"></div>

      {/* Features Section - GRIS CLARO */}
      <div ref={featuresRef} className="bg-gray-50 py-20 md:py-32 lg:py-40">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16">
          <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Todo lo que necesitas para <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 to-indigo-500">destacar</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Esta plataforma está diseñada para facilitar la creación de una página profesional que impresione a tus futuros empleadores o clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {/* Feature 1 */}
            <div className={`group bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-500 transform ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
              <div className="h-2 bg-gradient-to-r from-indigo-800 to-indigo-600"></div>
              <div className="p-8 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">Fácil de Usar</h3>
                <p className="text-gray-600">
                  Edita tu información en pocos pasos y obtén un diseño profesional sin necesidad de conocimientos técnicos.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className={`group bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-500 transform ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <div className="h-2 bg-gradient-to-r from-indigo-700 to-indigo-500"></div>
              <div className="p-8 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">Personalizable</h3>
                <p className="text-gray-600">
                  Elige los colores que reflejen tu identidad profesional y te hagan destacar entre la competencia.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className={`group bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-500 transform ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <div className="h-2 bg-gradient-to-r from-indigo-600 to-indigo-400"></div>
              <div className="p-8 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">Comparte con un Link</h3>
                <p className="text-gray-600">
                  Genera un enlace único para tu portfolio y compártelo en tus redes sociales, email, o CV para maximizar tu visibilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separador visual */}
      <div className="h-20 bg-gray-50"></div>

      {/* Sección de IA */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            <div className="md:col-span-3 group bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-500 transform">
              <div className="p-8 md:p-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">Optimización con IA</h3>
                <p className="text-gray-600 mb-4 max-w-3xl mx-auto">
                  Nuestra inteligencia artificial analiza tu sector y te sugiere las <span className="font-medium text-indigo-700">palabras clave más relevantes</span> para destacar en motores de búsqueda, LinkedIn y plataformas de empleo.
                </p>
                <p className=" text-amber-500 max-w-2xl mx-auto">
                  Mejora la visibilidad de tu perfil y aumenta tus posibilidades de ser encontrado por reclutadores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separador visual */}
      <div className="h-20 bg-gray-50"></div>

      {/* Testimonial/Stats Section - BLANCO */}
      <div className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 text-center items-stretch">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center justify-center h-28 lg:h-36">
              <div className="text-4xl font-bold text-indigo-600 mb-1">+5,000</div>
              <p className="text-gray-700">Usuarios satisfechos</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center justify-center h-28 lg:h-36">
              <div className="text-4xl font-bold text-indigo-600 mb-1">+10,000</div>
              <p className="text-gray-700">Páginas creadas</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center justify-center h-28 lg:h-36">
              <div className="text-4xl font-bold text-indigo-600 mb-1">98%</div>
              <p className="text-gray-700">Tasa de satisfacción</p>
            </div>
          </div>
        </div>
      </div>

      {/* Separador visual */}
      <div className="h-20 bg-gray-50"></div>

      {/* CTA Section - AZUL OSCURO */}
      <div ref={ctaRef} className="bg-gray-50 py-20 lg:py-32 relative overflow-hidden">

        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className={`max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-700 transform border border-gray-100 ${isVisible.cta ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-3 p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  ¿Te atreves <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 to-indigo-500">a brillar profesionalmente</span>?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Empieza a crear tu página profesional hoy mismo y lleva tu carrera profesional al siguiente nivel.
                </p>
                <Link
                  to="/signup"
                  className="group inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg bg-gradient-to-r from-indigo-800 to-indigo-500 text-white shadow-lg shadow-indigo-500/10 transform transition-all duration-300 hover:scale-105"
                >
                  Registrarse Gratis
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
              <div className="md:col-span-2 bg-gray-50 flex items-center justify-center p-8 lg:p-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white text-indigo-600 mb-4 shadow-md border border-gray-100">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <p className="text-indigo-700 font-medium">Configura tu portfolio<br />en menos de 10 minutos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Separador visual */}
      <div className="h-20 bg-gray-50"></div>
    </div>
  );
}