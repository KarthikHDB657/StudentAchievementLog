import React from 'react';
import { Card, CardContent, CardActions, CardHeader, IconButton, CardMedia } from '@ellucian/react-design-system/core';
import { Icon } from '@ellucian/ds-icons/lib';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';

const styles = () => ({
  media: {
    // Add these styles to adjust image size
    // maxWidth: '100%',
    // height: 'auto',
    objectfit: 'contain',
    // display: 'block',
    margin: 'auto'
  },
  mediaContainer: {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  },
});

const AchievementCard = ({ achievement, handleEditClick, handleDeleteClick,handleViewClick,classes }) => {
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
            <IconButton color="gray" aria-label="View" onClick={() => handleViewClick(achievement)}>
              <Icon name="info" />
            </IconButton>
          </CardActions>
        }
      />
      <div className={classes.mediaContainer}>
        <CardMedia
          component="img"
          alt={achievement.achievementTitle}
          height="140"
          image={`http://localhost:5000/${achievement.imageUrl}`} // Update the URL for the image
          // style={{ display: 'block', margin: 'auto' }}// Update the URL for the image
          className={classes.media}
        />
      </div>
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
  handleViewClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AchievementCard);

