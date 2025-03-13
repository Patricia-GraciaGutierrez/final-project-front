import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.services";

const CVPublic = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const currentUserId = userId || (user?._id);
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUserId) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Fetch all profile data with a single call
        const response = await userService.getUserProfile(currentUserId);
        setProfileData(response.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [currentUserId]);

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/preview/${currentUserId}`;
    navigator.clipboard.writeText(url);
    alert("¡URL copiada al portapapeles!");
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No se encontraron datos del perfil.</p>
      </div>
    );
  }

  const { name, info, theme } = profileData;
  const { bio, skills, experience, education, location } = profileData.curriculum || {};
  const projects = profileData.projects || [];
  const contact = profileData.contact || {};

  return (
    <div className="font-mono text-gray-800 bg-white min-h-screen">
      {/* Minimal Header */}
      <header className="py-8 px-6 border-b border-gray-200">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-normal tracking-tight">{name || "CV"}</h1>
          <div className="flex items-center space-x-6">
            {!userId && (
              <button
                onClick={() => navigate('/edit-profile')}
                className="text-sm hover:underline"
              >
                Editar
              </button>
            )}
            <button
              onClick={handleCopyUrl}
              className="text-sm hover:underline"
            >
              Compartir
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
          {/* Left Column - Info */}
          <div className="md:col-span-2">
            <div className="space-y-12">
              {/* Info Section */}
              <section>
                <h2 className="text-xs uppercase tracking-wider mb-6 text-gray-400 font-medium">Información</h2>
                <div className="space-y-8">
                  {info && (
                    <div>
                      <p className="text-lg leading-relaxed">{info}</p>
                    </div>
                  )}
                  
                  {location && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Ubicación</h3>
                      <p>{location}</p>
                    </div>
                  )}
                </div>
              </section>
              
              {/* Skills Section */}
              {skills && skills.length > 0 && (
                <section>
                  <h2 className="text-xs uppercase tracking-wider mb-6 text-gray-400 font-medium">Habilidades</h2>
                  <div className="flex flex-wrap">
                    {skills.map((skill, index) => (
                      <span key={index} className="mr-4 mb-3 pb-1 border-b border-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Contact Section */}
              {contact && (contact.email || contact.phone || (contact.socialLinks && contact.socialLinks.length > 0)) && (
                <section>
                  <h2 className="text-xs uppercase tracking-wider mb-6 text-gray-400 font-medium">Contacto</h2>
                  <div className="space-y-3">
                    {contact.email && (
                      <p>
                        <span className="text-sm font-medium">Email: </span>
                        <a href={`mailto:${contact.email}`} className="hover:underline">
                          {contact.email}
                        </a>
                      </p>
                    )}
                    
                    {contact.phone && (
                      <p>
                        <span className="text-sm font-medium">Teléfono: </span>
                        <a href={`tel:${contact.phone}`} className="hover:underline">
                          {contact.phone}
                        </a>
                      </p>
                    )}
                    
                    {contact.socialLinks && contact.socialLinks.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">Enlaces</h3>
                        <div className="space-y-2">
                          {contact.socialLinks.map((link, index) => (
                            <a 
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block hover:underline"
                            >
                              {link.platform}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
          
          {/* Right Column - Main Content */}
          <div className="md:col-span-3">
            <div className="space-y-16">
              {/* Bio Section */}
              {bio && (
                <section>
                  <h2 className="text-xs uppercase tracking-wider mb-6 text-gray-400 font-medium">Biografía</h2>
                  <p className="text-lg leading-relaxed">{bio}</p>
                </section>
              )}
              
              {/* Experience Section */}
              {experience && experience.length > 0 && (
                <section>
                  <h2 className="text-xs uppercase tracking-wider mb-6 text-gray-400 font-medium">Experiencia</h2>
                  <div className="space-y-10">
                    {experience.map((exp, index) => (
                      <div key={index} className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium">{exp.title}</h3>
                        <p className="text-md">{exp.company}</p>
                        {(exp.startDate || exp.endDate) && (
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(exp.startDate)} 
                            {exp.endDate ? ` - ${formatDate(exp.endDate)}` : " - Presente"}
                          </p>
                        )}
                        {exp.description && (
                          <p className="mt-4 leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Education Section */}
              {education && education.length > 0 && (
                <section>
                  <h2 className="text-xs uppercase tracking-wider mb-6 text-gray-400 font-medium">Educación</h2>
                  <div className="space-y-10">
                    {education.map((edu, index) => (
                      <div key={index} className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium">{edu.degree}</h3>
                        <p className="text-md">{edu.institution}</p>
                        {(edu.startDate || edu.endDate) && (
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(edu.startDate)} 
                            {edu.endDate ? ` - ${formatDate(edu.endDate)}` : " - Presente"}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Projects Section */}
              {projects && projects.length > 0 && (
                <section>
                  <h2 className="text-xs uppercase tracking-wider mb-6 text-gray-400 font-medium">Proyectos</h2>
                  <div className="space-y-10">
                    {projects.map((project, index) => (
                      <div key={index} className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium">{project.title}</h3>
                        {project.description && (
                          <p className="mt-2 leading-relaxed">{project.description}</p>
                        )}
                        
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">Tecnologías:</p>
                            <div className="flex flex-wrap">
                              {project.technologies.map((tech, idx) => (
                                <span key={idx} className="mr-3 mb-2 text-sm text-gray-600">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {project.link && (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-3 underline hover:no-underline"
                          >
                            Ver proyecto
                          </a>
                        )}
                        
                        {project.images && project.images.length > 0 && (
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.images.map((img, idx) => (
                              <img 
                                key={idx}
                                src={img} 
                                alt={`${project.title} - imagen ${idx + 1}`}
                                className="w-full h-auto object-cover border border-gray-200"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 mt-16">
        <div className="max-w-5xl mx-auto text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {name}
        </div>
      </footer>
    </div>
  );
};

export default CVPublic;