import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // Import axios or your preferred HTTP client library

export const AchievementContext = createContext();

export const AchievementProvider = ({ children }) => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Fetch data from the server and update the state
    axios.get('http://localhost:5000/api/achievements')
      .then(response => {
        setAchievements(response.data);
      })
      .catch(error => {
        console.error('Error fetching achievements:', error);
      });
  }, []); // The empty dependency array ensures this effect runs only once

  const addAchievement = (newAchievement) => {
    setAchievements((prevAchievements) => [newAchievement, ...prevAchievements]);
  };

  const deleteAchievement = async (achievementId) => {
    try {
      await axios.delete(`http://localhost:5000/api/achievements/${achievementId}`);
      setAchievements((prevAchievements) =>
        prevAchievements.filter((achievement) => achievement._id !== achievementId)
      );
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  const updateAchievement = (updatedAchievement) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement._id === updatedAchievement._id ? updatedAchievement : achievement
      )
    );
  };

  return (
    <AchievementContext.Provider
      value={{ achievements, addAchievement, deleteAchievement, updateAchievement }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

// Define propTypes to expect the 'children' prop
AchievementProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
