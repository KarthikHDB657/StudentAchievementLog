import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {Grid,Typography, Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Search, Dropdown, DropdownItem, VARIANTS, Illustration,
  IMAGES
} from '@ellucian/react-design-system/core';
import { usePageControl } from '@ellucian/experience-extension-utils';
import { useHistory } from 'react-router-dom';
import { AchievementContext } from '../context/achievementContext';
import AchievementCard from './AchievementCard';
import { fountain600, spacing40,fontWeightBold} from '@ellucian/react-design-system/core/styles/tokens';
import EditForm from './EditForm';
import ViewForm from './ViewForm'; // Import the ViewForm component


const styles = () => ({
  card: {
    //flex: '0 0 calc(33.33% - 10px)', // Adjust the width and margin as needed
    marginTop: spacing40,
    marginRight: spacing40,
    marginBottom: spacing40,
    marginLeft: spacing40,
    display: 'flex',
    flexDirection: 'row',
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
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Adjust minimum and maximum card width
    gap: '10px', // Adjust gap between cards
    margin: '10px', // Adjust margin as needed
  },
  button: {
    marginTop: 0,
    marginRight: spacing40,
    marginBottom: 0,
    marginLeft: spacing40
  },
 item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: spacing40,
    textAlign: 'center',
    marginTop:'100px'
  },
  sectionHeaders: {
    fontWeight: fontWeightBold,
},

});

const AchievementList = (props) => {
  const { classes } = props;
  const { achievements, deleteAchievement, refreshAchievements } = useContext(AchievementContext);
  const { setPageTitle } = usePageControl();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredAchievements, setFilteredAchievements] = useState('');
  const history = useHistory();
  const categories = [
    'Paper submission',
    'Conference',
    'Awards',
    'Appreciation note received',
    'Certification'
  ];

  setPageTitle('Student Achievement List');
  
  useEffect(() => {
    refreshAchievements(); 
  }, [refreshAchievements]);
  
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

  const handleViewDialogOpen = (achievement) => {
    setSelectedAchievement(achievement);
    setViewDialogOpen(true);
  };

  const handleViewDialogClose = () => {
    setViewDialogOpen(false);

  };

  const handleSearchInvoked = searchValue => {
    setSearchInput(searchValue);
  };

  const handleClearSearch = () => {
    setSearchInput('');
  };
  //for searching
  const filterAchievements = (achievements, searchInput, selectedCategory) => {
    if (!searchInput && selectedCategory === 'All Categories') {
      return achievements;
    }

    const searchTerm = searchInput.toLowerCase();
    const filteredByCategory = achievements.filter((achievement) =>
      selectedCategory ? achievement.category === selectedCategory : true
    );

    return filteredByCategory.filter((achievement) =>
      !searchInput || achievement.studentName.toLowerCase().includes(searchTerm)
    );
  };

  // Filter achievements based on search input and selected category
  // const filterAchievements = (achievements, searchInput, selectedCategory) => {
  //   const searchTerm = searchInput.toLowerCase();
  //   return achievements.filter((achievement) =>
  //     (selectedCategory === 'All Categories' || achievement.category === selectedCategory) &&
  //     (achievement.studentName.toLowerCase().includes(searchTerm))
  //   );
  // };

  // Update filteredAchievements when searchInput or selectedCategory changes
  useEffect(() => {
    const newFilteredAchievements = filterAchievements(
      achievements,
      searchInput,
      selectedCategory
    );
    setFilteredAchievements(newFilteredAchievements);
  }, [achievements, searchInput, selectedCategory]);


  const navigateToAddAchievement = () => {
    history.push('/add-achievement');
  };

  // const filteredAchievements = filterAchievements(achievements, searchInput,selectedCategory);


  return (
    <div>
      {/* <Grid container direction="row" justifyContent="flex-end" marginTop={20}> */}

      <Grid container direction="row" justifyContent="flex-end" style={{ marginTop: '-40px' }}>
        <div style={{ marginRight: '8px', marginTop: '-4px', height: '32px', marginBottom: '3px' }}>
          <Button
            variant="contained"
            // size="small"
            color="primary"
            onClick={navigateToAddAchievement}
          >
            Add Achievement
          </Button>
        </div>
        <div style={{ marginRight: '8px', marginTop: '-4px', marginBottom: '3px' }}>
          <Dropdown
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            margin="dense"
            size="small"
            style={{ width: '200px' }}
          >
            <DropdownItem default label="All Categories" value="" />
            {categories.map((option) => (
              <DropdownItem key={option} label={option} value={option} />
            ))}
          </Dropdown>
        </div>
        <div style={{ marginRight: '8px', height: '32px', marginTop: '-5px', marginBottom: '3px' }}>
          {/* <TextField
              label="Search by Student Name"
              size="small"
              value={searchInput}
              
              
              onChange={(e) => setSearchInput(e.target.value)}
            /> */}
          {/* <TextField
                label="Search by Student Name"
                value={searchInput}
                size = "small"
                onChange={(e) => {
                      setSearchInput(e.target.value);
                      setFilteredAchievements(
                             filterAchievements(achievements, e.target.value, selectedCategory)
                       );
                       }}
                style ={{ width: '201px',height: '32px'}}
              /> */}

          <Search
            inputProps={{ 'aria-label': 'Search for a student' }}
            id="standaalone-search"
            variant={VARIANTS.STANDALONE}
            name="search"
            onChange={(e) => {
              setSearchInput(e.target.value);
              setFilteredAchievements(
                filterAchievements(achievements, e.target.value, selectedCategory)
              );
            }}
            onSearchInvoked={handleSearchInvoked}
            onClear={handleClearSearch}
            placeholder="Search for a Student"
            value={searchInput}
            // style={{ width: '100px', height: '32px' }}
            expanded={true}
          />

          {/* Search Input */}

        </div>
        {/* <div style={{ marginRight: '8px', marginTop: '-4px', marginBottom: '3px' }}>
          <Dropdown
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            margin="dense"
            size="small"
            style={{ width: '200px' }}
          >
            <DropdownItem default label="All Categories" value="All Categories" />
            {categories.map((option) => (
              <DropdownItem key={option} label={option} value={option} />
            ))}
          </Dropdown>
        </div> */}
      </Grid>
      {/* </Grid> */}
      {/* <Grid container direction="row" alignItems="stretch" marginBottom={2} className={classes.achievementList}>
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement._id}
              achievement={achievement}
              handleDeleteClick={() => handleDeleteDialogOpen(achievement)}
              handleEditClick={() => handleEditDialogOpen(achievement)}
              classes={classes}
            />
          ))
        ) : (
           <div className={classes.centerContent}>
                <Illustration name={IMAGES.NO_SEARCH_RESULTS} />
                <p>NO_SEARCH_RESULTS</p>
            </div>
          
          
        )}
        </Grid> */}
      {filteredAchievements.length > 0 ? (
        <Grid container direction="row" alignItems="stretch" marginBottom={2} className={classes.achievementList}>
          {filteredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement._id}
              achievement={achievement}
              handleDeleteClick={() => handleDeleteDialogOpen(achievement)}
              handleEditClick={() => handleEditDialogOpen(achievement)}
              handleViewClick = {() => handleViewDialogOpen(achievement)}
              classes={classes}
            />
          ))}
        </Grid>
      ) : (
        <div className={classes.centerContent}>
          <div className={classes.item}>
            <Illustration name={IMAGES.NO_SEARCH_RESULTS} />
            <Typography variant="h2" className={classes.sectionHeaders}>No results found.</Typography>
          </div>
        </div>
      )}

      {/* {achievements.map((achievement) => (
          <AchievementCard
             key={achievement._id}
             achievement={achievement}
             handleDeleteClick={() => handleDeleteDialogOpen(achievement)}
             handleEditClick={() => handleEditDialogOpen(achievement)}
             classes={classes}
          />
        ))} */}
      {/* {filteredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement._id}
              achievement={achievement}
              handleDeleteClick={() => handleDeleteDialogOpen(achievement)}
              handleEditClick={() => handleEditDialogOpen(achievement)}
              classes={classes}
            />
          
        ))} */}

      {/* {/* Edit Dialog   onClose={handleEditDialogClose}} */}
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
      {/*View Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleViewDialogClose}>
        <DialogTitle>View Achievement</DialogTitle>
        <DialogContent>
          {/* Use the EditForm component here */}
          <ViewForm
            classes={classes}
            achievement={selectedAchievement}
            handleViewDialogClose={handleViewDialogClose}
          />
        </DialogContent>
      </Dialog>



    </div >
  );
};

AchievementList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AchievementList);
