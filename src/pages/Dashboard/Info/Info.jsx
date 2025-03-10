import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import profileService from "../../../services/profile.service";

const Info = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({ bio: "", skills: [], location: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(user)
    if (user && user._id) {
      profileService.getProfileById(user._id)
        .then((response) => {
          if (response.data && response.data.userId) {
            setProfile(response.data);
          } else {
            console.warn("No profile found for this user.");
            setProfile({ bio: "", skills: [], location: "" });
          }
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [user]);

  const handleSave = async () => {
    try {
      if (!user?._id) {
        console.error("No user ID found. Cannot create or update profile.");
        return;
      }

      if (!user?._id) { 
        console.error("No user ID found. Cannot create or update profile.");
        return;
      }
      
      if (!profile.userId) {
        console.log("Profile ID missing, creating new profile...");
        const newProfile = await profileService.createProfile({
          userId: user._id,
          ...profile
        });
        setProfile(newProfile.data);
      } else {
        await profileService.updateProfile(profile._id, profile); // 👈 Usar profile._id
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-indigo-500 mb-4">Info</h2>
      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Bio"
          />
          <input
            value={profile.skills.join(", ")} // 👈 Convertir array a string
            onChange={(e) =>
              setProfile({ ...profile, skills: e.target.value.split(",") })
            }
            className="w-full p-2 border rounded"
            placeholder="Skills (separadas por coma)"
          />
          <input
            value={profile.location}
            onChange={(e) =>
              setProfile({ ...profile, location: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Location"
          />
          <button
            onClick={handleSave}
            className="bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-700">{profile.bio}</p>
          <p className="text-gray-700">{profile.skills.join(", ")}</p>{" "}
          {/* 👈 Convertir array a string */}
          <p className="text-gray-700">{profile.location}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-indigo-500 text-white px-4 py-2 rounded mt-4"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Info;
