import React from 'react';
import { Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Search 
            className="text-indigo-500" 
            size={80} 
            strokeWidth={1.5}
          />
        </div>
        <h1 className="text-4xl font-bold text-indigo-500 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mb-6">
          Lo sentimos, la página que está buscando no existe o ha sido movida.
        </p>
        <a 
          href="/" 
          className="inline-block bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;