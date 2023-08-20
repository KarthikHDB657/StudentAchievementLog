import React from 'react';
import { Card, CardContent, CardActions, CardHeader, IconButton, CardMedia } from '@ellucian/react-design-system/core';
import { Icon } from '@ellucian/ds-icons/lib';
import PropTypes from 'prop-types';

const AchievementCard = ({ achievement, handleEditClick, handleDeleteClick, classes }) => {
  // const imageUrl = `http://localhost:5000/${achievement.imageUrl.replace(/\\/g, '/')}`;
  return (
    <Card className={classes.card}>
      <CardHeader
        title={achievement.category}
        action={
          <CardActions className={classes.actions}>
            <IconButton color="gray" aria-label="Edit" onClick={handleEditClick}>
              <Icon name="edit" />
            </IconButton>
            <IconButton color="gray" aria-label="Delete" onClick={() => handleDeleteClick(achievement)}>
              <Icon name="archive" />
            </IconButton>
          </CardActions>
        }
      />
      <CardMedia
        component="img"
        alt={achievement.achievementTitle}
        height="140"
        image={`http://localhost:5000/${achievement.imageUrl}`} // Update the URL for the image
        style={{ display: 'block', margin: 'auto' }}// Update the URL for the image
      />
      <CardContent>
        <h2>{achievement.achievementTitle}</h2>
        <p>Student: {achievement.studentName}</p>
        <p>Given by: {achievement.givenBy}</p>
        {/* Display more achievement details */}
      </CardContent>
    </Card>
  );
};

AchievementCard.propTypes = {
  achievement: PropTypes.object.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default AchievementCard;
