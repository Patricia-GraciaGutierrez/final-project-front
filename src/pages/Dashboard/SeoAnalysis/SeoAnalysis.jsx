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

    // Función para capitalizar la primera letra de cada palabra
    const capitalize = (text) => {
        return text.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Convertir el string en un array y capitalizar las palabras
    const keywordsArray = seoData?.suggestions
        ?.split(",")
        ?.map(word => capitalize(word.trim())) || [];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">SEO Analysis</h2>
            {loading && <p className="text-gray-500">Analizando...</p>}
            {seoData && (
                <div className="mt-4">
                    <p className="text-black">
                        <strong>Hemos analizado tu perfil y estas son las palabras clave que deberías incluir en tu currículum y perfil profesional para mejorar su visibilidad en buscadores como Google y facilitar que más personas te encuentren. Incorporar estas palabras ayudará a destacar tu experiencia y habilidades:</strong>
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