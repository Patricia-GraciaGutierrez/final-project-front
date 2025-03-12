import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import userService from "../../../services/user.services";

function CVPreview() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    location: "",
    experience: [],
    skills: [],
  });

  useEffect(() => {
    if (user?._id) {
      userService.getUserProfile(user._id)
        .then(response => {
          const profileData = response.data;

          setUserData({
            name: profileData.name || "",
            bio: profileData.curriculum?.bio || "",
            location: profileData.curriculum?.location || "",
            experience: profileData.curriculum?.experience || [],
            skills: profileData.curriculum?.skills || [],
          });
        })
        .catch(error => console.error("Error fetching user data:", error));
    }
  }, [user?._id]);

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/preview/${user._id}`;
    navigator.clipboard.writeText(url);
    alert("¡URL copiada al portapapeles!");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        {userData ? (
          <>
            <h1 className="text-2xl font-semibold text-indigo-600">{userData.name}</h1>
            <p className="text-gray-600">{userData.bio}</p>
            <p className="text-gray-600">📍 {userData.location}</p>
            <h2 className="text-xl font-semibold mt-4">Experiencia</h2>
            <ul>
              {userData.experience.map((exp, index) => (
                <li key={index} className="border-b py-2">{exp.title} - {exp.company}</li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold mt-4">Habilidades</h2>
            <ul className="flex flex-wrap">
              {userData.skills.map((skill, index) => (
                <li key={index} className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded-full m-1">{skill}</li>
              ))}
            </ul>
            <button
              onClick={handleCopyUrl}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Compartir URL
            </button>
          </>
        ) : (
          <p className="text-gray-500">Cargando perfil...</p>
        )}
      </div>
    </div>
  );
}

export default CVPreview;
