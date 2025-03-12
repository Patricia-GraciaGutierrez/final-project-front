import React, { useState, useEffect } from 'react';
import profileService from '../../../services/curriculum.service';

const Experience = ({ userId }) => {
  const [profile, setProfile] = useState({ experience: [] });
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    degree: '',
    institution: '',
    location: '',
    platform: '',
    url: '',
  });

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

  const handleAddExperience = async () => {
    try {
      const updatedProfile = {
        ...profile,
        experience: [...profile.experience, newExperience],
      };
      await profileService.updateProfile(userId, updatedProfile);
      setProfile(updatedProfile);
      setNewExperience({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        degree: '',
        institution: '',
        location: '',
        platform: '',
        url: '',
      });
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-indigo-500 mb-4">Curriculum</h2>
      
      <div className="space-y-4">
        <input
          value={newExperience.title}
          onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Title"
        />
        <input
          value={newExperience.company}
          onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Company"
        />
        <input
          type="date"
          value={newExperience.startDate}
          onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={newExperience.endDate}
          onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          value={newExperience.description}
          onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Description"
        />
        <h2 className="text-2xl font-bold text-indigo-500 mb-4">Education</h2>
        <input
          value={newExperience.degree}
          onChange={(e) => setNewExperience({ ...newExperience, degree: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Degree"
        />
        <input
          value={newExperience.institution}
          onChange={(e) => setNewExperience({ ...newExperience, institution: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Institution"
        />
        <h2 className="text-2xl font-bold text-indigo-500 mb-4">Location</h2>
        <input
          value={newExperience.location}
          onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Location"
        />
        <h2 className="text-2xl font-bold text-indigo-500 mb-4">Social Links</h2>
        <input
          value={newExperience.platform}
          onChange={(e) => setNewExperience({ ...newExperience, platform: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Platform"
        />
        <input
          value={newExperience.url}
          onChange={(e) => setNewExperience({ ...newExperience, url: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Url"
        />

        <button
          onClick={handleAddExperience}
          className="bg-indigo-500 text-white px-4 py-2 rounded"
        >
          Add Curriculum
        </button>
      </div>
      <div className="mt-6">
        {profile.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">{exp.title} at {exp.company}</h3>
            <p className="text-gray-600">{exp.startDate} - {exp.endDate}</p>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;