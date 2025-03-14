# 🚀 PatShare

## 📋 Descripción
Este proyecto es una aplicación web full-stack desarrollada con React en el frontend y Express/Node.js en el backend, utilizando MongoDB como base de datos.

## 🏗️ Estructura del Proyecto
El proyecto está dividido en dos partes principales:
- **🖥️ Cliente (Frontend)**: Aplicación React
- **⚙️ Servidor (Backend)**: API REST con Express y MongoDB

## 🛠️ Tecnologías Utilizadas

### Frontend
- **⚛️ React 19.0.0**: Biblioteca JavaScript para construir interfaces de usuario
- **🧭 React Router 7.2.0**: Enrutamiento para aplicaciones React
- **🔄 Axios**: Cliente HTTP para realizar peticiones al backend
- **🎨 Tailwind CSS**: Framework de CSS para diseño responsivo

### Backend
- **📦 Node.js**: Entorno de ejecución para JavaScript del lado del servidor
- **🚂 Express**: Framework web para Node.js
- **🍃 MongoDB**: Base de datos NoSQL (a través de Mongoose)
- **🔐 JWT**: Autenticación basada en tokens
- **🔒 bcryptjs**: Encriptación de contraseñas
- **🔧 dotenv**: Gestión de variables de entorno

## ✨ Características
- 🔐 Autenticación de usuarios con JWT
- 🔒 Almacenamiento seguro de contraseñas con bcrypt
- 🌐 API RESTful
- 💅 Interfaz de usuario moderna construida con React y Tailwind CSS
- 🚀 Configuración para despliegue en plataformas como Netlify

## 🌍 Despliegue
- **Frontend**: Configurado para ser desplegado en servicios como Netlify, añadiendo automáticamente un archivo `_redirects` durante el proceso de build para manejar rutas de SPA.
- **Backend**: Puede ser desplegado en servicios como Heroku, Render, o cualquier proveedor que soporte Node.js.

## 📁 Estructura de Carpetas
```
name-of-project/
├── client/                # Frontend React
│   ├── public/            # Archivos estáticos
│   ├── src/               # Código fuente
│   └── package.json       # Dependencias del frontend
│
└── server/                # Backend Express
    ├── models/            # Modelos de Mongoose
    ├── routes/            # Rutas de la API
    ├── middleware/        # Middleware personalizado
    ├── server.js          # Punto de entrada
    └── package.json       # Dependencias del backend
```

## 📄 Licencia
[Especifica la licencia bajo la cual se distribuye este proyecto]

## 👤 Autora
Desarrollado con ❤️ por Patricia

## 🔗 Enlaces
- 🌐 **Web en Producción (Netlify)**: [https://naturalhub.netlify.app/](https://naturalhub.netlify.app/)
- 📂 **Repositorio Backend (Render)**: [https://proyect-2-backend.onrender.com/](https://proyect-2-backend.onrender.com/)

¡Gracias por visitar PatShare!
