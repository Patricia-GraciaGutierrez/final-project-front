import { useState, useEffect } from "react";
import seoService from "../../../services/seo.service";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";

function SeoAnalysis() {
    const { user } = useContext(AuthContext);
    const [seoData, setSeoData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSeoAnalysis = async () => {
            setLoading(true);
            try {
                const { data } = await seoService.getSeoAnalysis();
                setSeoData(data);
            } catch (error) {
                console.error("Error fetching SEO analysis:", error);
            }
            setLoading(false);
        };

        if (user) fetchSeoAnalysis();
    }, [user]);

    // Función para capitalizar solo la primera letra de toda la frase
    const capitalizeFirstLetter = (text) => {
        if (!text) return '';
        return text.toLowerCase()
                  .charAt(0).toUpperCase() + text.toLowerCase().slice(1);
    };

    // Convertir el string en un array y formatear cada palabra clave
    const keywordsArray = seoData?.suggestions
        ?.split(",")
        ?.map(word => capitalizeFirstLetter(word.trim())) || [];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-500 text-center">Análisis de tu perfil con la IA Gemini</h2>
            {loading && <p className="text-gray-500">Analizando...</p>}
            
            {!seoData && !loading && (
                <p className="text-red-600 text-left font-medium mt-4">
                    Rellena los campos "Breve descripción", "Profesión" y "Resumen profesional" para que la Inteligencia Artificial analice tu perfil.
                </p>
            )}

            {seoData && (
                <div className="mt-4 text-left">
                    <p className="text-black font-medium mb-8">
                        Estas son las palabras clave que deberías incluir en tu perfil profesional para mejorar tu visibilidad en buscadores como Google, o redes sociales como Linkedin, y facilitar que más personas te encuentren. Incorporar estas palabras ayudará a destacar tu experiencia y habilidades:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-black">
                        {keywordsArray.map((keyword, index) => (
                            <li key={index}>{keyword}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SeoAnalysis;