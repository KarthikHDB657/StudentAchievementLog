import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Grid, Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@ellucian/react-design-system/core';
import { usePageControl } from '@ellucian/experience-extension-utils';
import { useHistory } from 'react-router-dom';
import { AchievementContext } from '../context/achievementContext';
import AchievementCard from './AchievementCard';
import { fountain600 } from '@ellucian/react-design-system/core/styles/tokens';
import EditForm from './EditForm';

const styles = () => ({
  card: {
    flex: '0 0 calc(33.33% - 10px)', // Adjust the width and margin as needed
    marginBottom: '20px',
    marginTop:'20px',
  },
  centerContent: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  iconFill: {
    color: fountain600,
  },
  media: {
    height: '15.625rem',
  },
  achievementList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '0 -10px',
  },
  
  
});

const AchievementList = (props) => {
  const { classes } = props;
  const { achievements, deleteAchievement} = useContext(AchievementContext);
  const { setPageTitle } = usePageControl();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // To track whether data has been fetched
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const history = useHistory();
  setPageTitle('Student Achievement List');

  useEffect(() => {
    if (!dataFetched) {
      // Fetch data from API and set in context
      fetch('http://localhost:5000/api/achievements')
        .then(response => response.json())
        .then(data => {
          setDataFetched(data);
         console.log(data);
        })
        .catch(error => {
          console.error('Error fetching achievements:', error);
        });
    }
  }, [dataFetched]);

  const handleDelete = async () => {
    if (selectedAchievement) {
      try {
        await deleteAchievement(selectedAchievement._id);
        setDeleteDialogOpen(false);
        setSelectedAchievement(null);
      } catch (error) {
        console.error('Error deleting achievement:', error);
      }
    }
  };
  const handleDeleteDialogOpen = (achievement) => {
    setSelectedAchievement(achievement);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedAchievement(null);
  };
  
  const handleDeleteConfirm = () => {
    handleDelete();
    setDeleteDialogOpen(false);
  };
  
  const handleEditDialogOpen = (achievement) => {
    setSelectedAchievement(achievement);
    setEditDialogOpen(true);
  };
  
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    
  };

  const navigateToAddAchievement = () => {
    history.push('/add-achievement'); 
  };

  return (
    <div>
      <Grid xs={12} container direction="row" justifyContent="flex-end" alignItems="center" marginBottom={2}>
        <Button variant="contained" color="primary" onClick={navigateToAddAchievement}>
          Add Achievement
        </Button>
      </Grid>
      <Grid container direction="row" alignItems="stretch" marginBottom={2}>
        {achievements.map((achievement) => (
          <AchievementCard
             key={achievement._id}
             achievement={achievement}
             handleDeleteClick={() => handleDeleteDialogOpen(achievement)}
             handleEditClick={() => handleEditDialogOpen(achievement)}
             classes={classes}
          />
        ))}
      </Grid>
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Achievement</DialogTitle>
        <DialogContent>
          {/* Use the EditForm component here */}
          <EditForm
            classes={classes}
            achievement={selectedAchievement}
            handleEditDialogClose={handleEditDialogClose}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this achievement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleDeleteConfirm}>Delete</Button>
          <Button variant="contained" onClick={handleDeleteDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AchievementList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AchievementList);
