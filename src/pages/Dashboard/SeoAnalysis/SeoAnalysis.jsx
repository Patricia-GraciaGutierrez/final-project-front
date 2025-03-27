import { useState, useEffect, useContext } from "react";
import seoService from "../../../services/seo.service";
import userService from "../../../services/user.services";
import { AuthContext } from "../../../context/auth.context";

function SeoAnalysis() {
    const { user } = useContext(AuthContext);
    const [seoData, setSeoData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchSeoAnalysis = async () => {
            if (!user) return;

            setLoading(true);
            setErrorMessage(null);

            try {
                // Obtener el perfil completo del usuario
                const profileResponse = await userService.getUserProfile(user._id);
                
                // Verificar campos necesarios
                const missingFields = [];
                if (!profileResponse.data.profession) missingFields.push('Profesión');
                if (!profileResponse.data.info) missingFields.push('Información');

                if (missingFields.length > 0) {
                    setErrorMessage(`Por favor, completa los siguientes campos: ${missingFields.join(', ')}`);
                    setLoading(false);
                    return;
                }

                // Proceder con el análisis SEO
                const seoResponse = await seoService.getSeoAnalysis();
                setSeoData(seoResponse);
            } catch (error) {
                console.error("Error fetching SEO analysis:", error);
                setErrorMessage(error.message || "No se pudo realizar el análisis SEO");
            } finally {
                setLoading(false);
            }
        };

        fetchSeoAnalysis();
    }, [user]);

    // Función para capitalizar solo la primera letra de toda la frase
    const capitalizeFirstLetter = (text) => {
        if (!text) return '';
        // Eliminar comillas y luego capitalizar
        return text.replace(/^"|"$/g, '').toLowerCase()
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
            
            {errorMessage && (
                <p className="text-red-600 text-left font-medium mt-4">
                    {errorMessage}
                </p>
            )}
    
            {!seoData && !loading && !errorMessage && (
                <p className="text-red-600 text-left font-medium mt-4">
                    Rellena los campos necesarios para que la Inteligencia Artificial analice tu perfil.
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