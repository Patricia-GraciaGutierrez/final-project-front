import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import contactService from "../../../services/contact.service";

function Contact() {
  const { user } = useContext(AuthContext);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    socialLinks: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await contactService.getContactByUserId(user._id);
        setContact(response.data || null);
        setFormData(prevFormData => response.data || prevFormData);
      } catch (error) {
        console.error("Error fetching contact:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchContact();
  }, [user._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  const handleAddSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { platform: "", url: "" }],
    });
  };

  const handleRemoveSocialLink = (index) => {
    const updatedLinks = formData.socialLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (contact) {
        await contactService.updateContact(contact._id, formData);
      } else {
        await contactService.createContact({ ...formData, userId: user._id });
      }
      setContact(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!contact) return;
    setLoading(true);
    try {
      await contactService.deleteContact(contact._id);
      setContact(null);
      setIsEditing(false);
      setFormData({
        email: "",
        phone: "",
        socialLinks: [],
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setLoading(false);
    }
  };

 
  const goToNextSection = () => {
    if (isEditing) {
      handleSubmit({ preventDefault: () => {} });
    }
    navigate(`/paginaprofesional/${user._id}`);
  };

  const goToPreviousSection = () => {
    navigate("/dashboard/projects");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-indigo-500 text-center mb-8">Información de contacto</h2>
      {loading ? (
        <p className="text-gray-500 text-left px-4">Cargando...</p>
      ) : contact && !isEditing ? (
        <div className="mt-4 px-12">
          <p className="text-left my-2  text-gray-900"><strong>Email:</strong> {contact.email}</p>
          <p className="text-left my-2  text-gray-900"><strong>Teléfono:</strong> {contact.phone}</p>
          <div className="text-left my-2  text-gray-900">
            <strong>Redes sociales:</strong>
            <ul className="mt-2">
              {contact.socialLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <span>{link.platform}: </span>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
                    {link.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-6 w-24 hover:bg-indigo-600 transition-colors duration-200"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
            <button
              className="bg-white border-2 border-red-500 text-red-500 px-4 py-2 rounded-md w-24 hover:bg-red-50 transition-colors duration-200"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-between mt-16">
            <button
              type="button"
              onClick={goToPreviousSection}
              className="flex items-center px-4 py-2 rounded-md bg-indigo-100 text-indigo-500 hover:bg-indigo-200 transition-colors duration-200"
            >
              <svg className="mr-2 h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button 
              onClick={goToNextSection}
              className="flex items-center px-4 py-2 rounded-md bg-indigo-100 text-indigo-500 hover:bg-indigo-200 transition-colors duration-200"
            >
              <svg className="ml-2 h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 px-8">
          <label className="block text-gray-700 font-black text-lg text-left mt-8 mb-4">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 text-left  text-gray-950"
            placeholder="ejemplo@ejemplo.com"
          />

          <label className="block text-gray-700 font-black text-lg text-left mt-8 mb-4">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 text-left  text-gray-950"
          />

          <label className="block text-gray-700 font-black text-lg text-left mt-8 mb-4">Redes sociales</label>
          {formData.socialLinks.map((link, index) => (
            <div key={index} className="flex space-x-2 mt-2 items-center">
              <input
                type="text"
                name="platform"
                value={link.platform}
                onChange={(e) => handleSocialLinkChange(index, "platform", e.target.value)}
                placeholder="Plataforma (e.j., Twitter, Linkedin)"
                className="w-1/2 border rounded-md p-2 text-left  text-gray-950"
              />
              <input
                type="url"
                name="url"
                value={link.url}
                onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                placeholder="URL"
                className="w-1/2 border rounded-md p-2 text-left  text-gray-950"
              />
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleRemoveSocialLink(index)}
                  className="bg-white border-2 border-red-500 text-red-500 px-4 py-2 rounded-md w-18 hover:bg-red-50 transition-colors duration-200"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={handleAddSocialLink}
                  className="bg-white border-2 border-indigo-500 text-indigo-500 px-4 py-2 rounded-md w-18 hover:bg-indigo-50 transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <br />

          {/* Botones de Guardar y Cancelar */}
          <div className="mt-16 flex justify-between">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-200"
            >
              {contact ? "Guardar" : "Crear"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Contact;