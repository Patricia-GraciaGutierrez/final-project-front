import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.services";
import "./CVPublic.css";

const CVPublic = () => {
  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  const currentUserId = userId || user?._id;

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [background, setBackground] = useState("waves-background"); // Estado para el fondo
  const contentRef = useRef(null);
  const cursorRef = useRef(null);

  // Cargar la preferencia de fondo guardada
  useEffect(() => {
    const savedBackground = localStorage.getItem("selectedBackground");
    if (savedBackground) {
      setBackground(savedBackground);
      document.body.className = savedBackground; // Aplicar la clase al body
    } else {
      document.body.className = "waves-background"; // Fondo predeterminado
    }
  }, []);

  // Guardar la preferencia de fondo
  const handleBackgroundChange = (bg) => {
    setBackground(bg);
    localStorage.setItem("selectedBackground", bg);
    document.body.className = bg; // Aplicar la clase al body
  };

  // Cursor personalizado
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Fetch del perfil
  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUserId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
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

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;

    setIsTransitioning(true);

    // Aplicar animación de salida
    if (contentRef.current) {
      contentRef.current.classList.add('content-exit');
    }

    // Cambiar pestaña después de la animación de salida
    setTimeout(() => {
      setActiveTab(tab);

      // Aplicar animación de entrada después de cambiar el contenido
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.classList.remove('content-exit');
          contentRef.current.classList.add('content-enter');

          // Eliminar la clase de animación de entrada después de completarse
          setTimeout(() => {
            if (contentRef.current) {
              contentRef.current.classList.remove('content-enter');
              setIsTransitioning(false);
            }
          }, 500);
        }
      }, 50);
    }, 300);
  };

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/preview/${currentUserId}`;
    navigator.clipboard.writeText(url);

    // Mostrar notificación estilizada en lugar de alerta
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = 'URL copiada al portapapeles';
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');

      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    }, 10);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="error-container">
        <div className="error-message">
          <span>404</span>
          <p>No se encontraron datos del perfil.</p>
        </div>
      </div>
    );
  }

  const { name, info, profession } = profileData;
  const { bio, skills, experience, education, location } = profileData.curriculum || {};
  const projects = profileData.projects || [];
  const contact = profileData.contact || {};

  // Renderiza la sección de Info
  const renderInfoTab = () => (
    <div className="tab-content">
      <h2 className="section-title">Información</h2>
      {info && (
        <div className="info-block">
          <p>{info}</p>
        </div>
      )}

      {location && (
        <div className="info-block location-block">
          <h3>Ubicación</h3>
          <p>{location}</p>
        </div>
      )}
    </div>
  );

  // Renderiza la sección de Curriculum
  const renderCurriculumTab = () => (
    <div className="tab-content">
      {/* Bio Section */}
      {bio && (
        <section className="content-section">
          <h2 className="section-title">Biografía</h2>
          <p>{bio}</p>
        </section>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <section className="content-section">
          <h2 className="section-title">Habilidades</h2>
          <div className="skills-container">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <section className="content-section">
          <h2 className="section-title">Experiencia</h2>
          <div className="timeline">
            {experience.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>{exp.title}</h3>
                  <h4>{exp.company}</h4>
                  {(exp.startDate || exp.endDate) && (
                    <p className="timeline-date">
                      {formatDate(exp.startDate)}
                      {exp.endDate ? ` - ${formatDate(exp.endDate)}` : " - Presente"}
                    </p>
                  )}
                  {exp.description && (
                    <p className="timeline-description">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <section className="content-section">
          <h2 className="section-title">Educación</h2>
          <div className="timeline">
            {education.map((edu, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>{edu.degree}</h3>
                  <h4>{edu.institution}</h4>
                  {(edu.startDate || edu.endDate) && (
                    <p className="timeline-date">
                      {formatDate(edu.startDate)}
                      {edu.endDate ? ` - ${formatDate(edu.endDate)}` : " - Presente"}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  // Renderiza la sección de Proyectos
  const renderProjectsTab = () => (
    <div className="tab-content">
      <h2 className="section-title">Proyectos</h2>
      {projects && projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              {project.images && project.images[0] && (
                <div className="project-image">
                  <img
                    src={project.images[0]}
                    alt={`${project.title}`}
                  />
                </div>
              )}
              <div className="project-details">
                <h3>{project.title}</h3>
                {project.description && (
                  <p className="project-description">{project.description}</p>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className="project-technologies">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Ver proyecto <span className="arrow">→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">No hay proyectos disponibles.</p>
      )}
    </div>
  );

  // Renderiza la sección de Contacto
  const renderContactTab = () => (
    <div className="tab-content">
      <h2 className="section-title">Contacto</h2>
      {contact && (contact.email || contact.phone || (contact.socialLinks && contact.socialLinks.length > 0)) ? (
        <div className="contact-grid">
          {contact.email && (
            <div className="contact-item">
              <h3>Email</h3>
              <a href={`mailto:${contact.email}`} className="contact-link">
                {contact.email}
              </a>
            </div>
          )}

          {contact.phone && (
            <div className="contact-item">
              <h3>Teléfono</h3>
              <a href={`tel:${contact.phone}`} className="contact-link">
                {contact.phone}
              </a>
            </div>
          )}

          {contact.socialLinks && contact.socialLinks.length > 0 && (
            <div className="contact-item social-links">
              <h3>Enlaces</h3>
              <div className="social-grid">
                {contact.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <span className="social-platform">{link.platform}</span>
                    <span className="social-arrow">→</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="empty-message">No hay información de contacto disponible.</p>
      )}
    </div>
  );

  // Renderiza la pestaña activa
  const renderActiveTab = () => {
    switch (activeTab) {
      case "info":
        return renderInfoTab();
      case "curriculum":
        return renderCurriculumTab();
      case "projects":
        return renderProjectsTab();
      case "contact":
        return renderContactTab();
      default:
        return renderInfoTab();
    }
  };

  return (
    <div className={`cv-container ${background}`}>

      {/* Cursor personalizado */}
      <div ref={cursorRef} className="custom-cursor"></div>

      {/* Header */}
      <header className="cv-header">
        <div className="header-content">
          <div className="identity">
            <h1 className="name">{name || "CV"}</h1>
            {profession && (
              <p className="profession">{profession}</p>
            )}
          </div>
          <div className="header-actions pt-8">
            <button
              onClick={handleCopyUrl}
              className="action-button share-button"
            >
              Compartir
            </button>
            <div className="background-selector">
        <button onClick={() => handleBackgroundChange("waves-background")}>
        </button>
        <button onClick={() => handleBackgroundChange("stripes-background")}>
        </button>
        <button onClick={() => handleBackgroundChange("circles-background")}>
        </button>
        <button onClick={() => handleBackgroundChange("grid-background")}>
        </button>
      </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="cv-navigation">
        <div className="nav-container">
          <button
            onClick={() => handleTabChange("info")}
            className={`nav-tab ${activeTab === "info" ? "active" : ""}`}
            disabled={isTransitioning}
          >
            Info
          </button>
          <button
            onClick={() => handleTabChange("curriculum")}
            className={`nav-tab ${activeTab === "curriculum" ? "active" : ""}`}
            disabled={isTransitioning}
          >
            Curriculum
          </button>
          <button
            onClick={() => handleTabChange("projects")}
            className={`nav-tab ${activeTab === "projects" ? "active" : ""}`}
            disabled={isTransitioning}
          >
            Projects
          </button>
          <button
            onClick={() => handleTabChange("contact")}
            className={`nav-tab ${activeTab === "contact" ? "active" : ""}`}
            disabled={isTransitioning}
          >
            Contact
          </button>
          <div
            className="nav-indicator"
            style={{
              left: `calc(${["info", "curriculum", "projects", "contact"].indexOf(
                activeTab
              ) * 25}% + 12.5%)`,
            }}
          ></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="cv-content" ref={contentRef}>
        {renderActiveTab()}
      </main>

      {/* Footer */}
      <footer className="cv-footer">
        <div className="footer-content">
          <span className="copyright">
            © {new Date().getFullYear()} PatShare
          </span>
        </div>
      </footer>
    </div>
  );
};

export default CVPublic;