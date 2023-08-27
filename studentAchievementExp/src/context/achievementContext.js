import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AchievementContext = createContext();

export const AchievementProvider = ({ children }) => {
  const [achievements, setAchievements] = useState([]);
  const refreshAchievements = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/achievements');
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  //Adding achievement
  const addAchievement = async (newAchievement) => {
    try {
      // Make the POST request to add the achievement
      const response = await axios.post('http://localhost:5000/api/achievements', newAchievement, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important!
        },
      });

      if (response.status === 201) {
        // Achievement added successfully, update the state
        setAchievements(prevAchievements => [response.data, ...prevAchievements]);
      } else {
        // Handle error scenario
        console.error('Failed to add achievement');
      }
    } catch (error) {
      // Handle any errors that occurred during the POST request
      console.error('Error adding achievement:', error);
    }
  };

  //helps in delete the achievement
  const deleteAchievement = async (achievementId) => {
    try {
      //deleting the id 
      await axios.delete(`http://localhost:5000/api/achievements/${achievementId}`);
      setAchievements((prevAchievements) =>
        prevAchievements.filter((achievement) => achievement._id !== achievementId)
      );
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  //helps in updating the achievement
  const updateAchievement = async (achievementId, updatedAchievement) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/achievements/${achievementId}`,
        updatedAchievement,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      //if success update achievements
      if (response.status === 200) {
        setAchievements((prevAchievements) =>
          prevAchievements.map((achievement) =>
            achievement._id === achievementId ? updatedAchievement : achievement
          )
        );
        console.log('Successfully updated achievement');

      } else {
        console.error('Failed to update achievement');
      }
    } catch (error) {
      console.error('Error updating achievement:', error);
    }
  };



  return (
    <AchievementContext.Provider
      value={{ achievements, addAchievement, deleteAchievement, updateAchievement, refreshAchievements }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

// Define propTypes to expect the 'children' prop
AchievementProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
