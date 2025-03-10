import React, { useState, useEffect } from 'react';
import profileService from '../../../services/profile.service';

const Contact = ({ userId }) => {
  const [profile, setProfile] = useState({ socialLinks: [] });
  const [newLink, setNewLink] = useState({ platform: '', url: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfileById(userId);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleAddLink = async () => {
    try {
      const updatedProfile = {
        ...profile,
        socialLinks: [...profile.socialLinks, newLink],
      };
      await profileService.updateProfile(userId, updatedProfile);
      setProfile(updatedProfile);
      setNewLink({ platform: '', url: '' });
    } catch (error) {
      console.error('Error adding social link:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-indigo-500 mb-4">Contact</h2>
      <div className="space-y-4">
        <input
          value={newLink.platform}
          onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Platform (e.g., LinkedIn)"
        />
        <input
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="URL"
        />
        <button
          onClick={handleAddLink}
          className="bg-indigo-500 text-white px-4 py-2 rounded"
        >
          Add Link
        </button>
      </div>
      <div className="mt-6">
        {profile.socialLinks.map((link, index) => (
          <div key={index} className="mb-4">
            <a href={link.url} className="text-indigo-500 hover:underline">{link.platform}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;