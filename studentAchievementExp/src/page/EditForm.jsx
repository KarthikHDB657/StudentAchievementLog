import React, { useState, useContext, useEffect } from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import PropTypes from 'prop-types';
import {
  FormControl,
  DropdownItem,
  Dropdown,
  TextField,
  Button,

} from '@ellucian/react-design-system/core';
import { AchievementContext } from '../context/achievementContext';
import moment from 'moment';

const styles = (theme) => ({
  card: {
    margin: `0 ${spacing20}`,
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: '8px',
  }

});

const EditForm = (props) => {
  const { classes, achievement, handleEditDialogClose } = props;
  const { updateAchievement, } = useContext(AchievementContext);
  const [studentName, setStudentName] = useState(achievement.studentName);
  const [category, setCategory] = useState(achievement.category);
  const [title, settitle] = useState(achievement.title);
  const [dateOfAchievement, setDateOfAchievement] = useState(achievement.dateOfAchievement.$date);
  const [givenBy, setGivenBy] = useState(achievement.givenBy);
  const [dateOfPosting, setDateOfPosting] = useState(achievement.dateOfPosting.$date);
  const [briefDescription, setBriefDescription] = useState(achievement.briefDescription);
  const [imageUrl, setimageUrl] = useState(achievement.imageUrl);
  const [linkToWebsite, setLinkToWebsite] = useState(achievement.linkToWebsite);
  const [errors, setErrors] = useState({
    studentName: '',
    category: '',
    title: '',
    dateOfAchievement: '',
    givenBy: '',
    dateOfPosting: '',
    briefDescription: '',
    imageUrl,
    linkToWebsite,

  });

  const categories = [
    'Paper submission',
    'Conference',
    'Awards',
    'Appreciation note received',
    'Certification'
  ];

  // Update dateOfAchievement state when the date picker value changes
  const handleDateOfAchievementChange = (e) => {
    const newDate = e.target.value;
    console.log(newDate);
    setDateOfAchievement(newDate);
  };

  //Update dateOfPosting state when the date picker value changes
  const handleDateOfPostingChange = (e) => {
    const newDate = e.target.value;
    console.log(newDate);
    setDateOfPosting(newDate);
  };

  //using moments to convert the incoming iso dates to current date
  const formatDate = (isoDate) => {
    return moment(isoDate).format('YYYY-MM-DD');
  };


  useEffect(() => {
    // When the component mounts, format the dates and set them in the state
    if (achievement.dateOfAchievement && achievement.dateOfPosting) {
      const formattedDateOfAchievement = formatDate(achievement.dateOfAchievement);
      const formattedDateOfPosting = formatDate(achievement.dateOfPosting);
      setDateOfAchievement(formattedDateOfAchievement);
      setDateOfPosting(formattedDateOfPosting);
    }
  }, [achievement.dateOfAchievement, achievement.dateOfPosting]);

  const validateName = (name) => {
    const regex = /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/;
    return regex.test(name);
  };

  const handleSave = async () => {
    // Initialize error object
    const newErrors = {};
    //Error validations for form fields
    if (!validateName(studentName)) {
      newErrors.studentName = 'Invalid Student name format';
    }
    if (!title) {
      newErrors.title = 'Achievement Title is required';
    }

    if (!dateOfAchievement) {
      newErrors.dateOfAchievement = 'Date of Achievement is required';
    }
    if (!dateOfPosting) {
      newErrors.dateOfAchievement = 'Date of Posting is required';
    }

    if (dateOfAchievement > dateOfPosting) {
      newErrors.dateOfPosting = 'Date of Achievement cannot be greater than Date of Posting';
    }

    if (!givenBy) {
      newErrors.givenBy = 'Date of Posting is required';
    }

    if (!briefDescription) {
      newErrors.briefDescription = 'brief description is required';
    }

    if (briefDescription.length > 500) {
      newErrors.briefDescription = 'Brief description cannot be more than 500 characters';
    }

    // Validation for imageUrl
    if (!imageUrl) {
      newErrors.imageUrl = 'Please reupload the certification proof image';
    } else if (imageUrl) {
      if (!['image/jpeg', 'image/png'].includes(imageUrl.type)) {
        newErrors.imageUrl = 'Only JPEG and PNG images are allowed';
      }
      if (imageUrl.size > 500 * 1024) {
        newErrors.imageUrl = 'Image size must be less than 500KB';
      }
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('studentName', studentName);
    formData.append('category', category);
    formData.append('title', title);
    formData.append('dateOfAchievement', dateOfAchievement);
    formData.append('givenBy', givenBy);
    formData.append('dateOfPosting', dateOfPosting);
    formData.append('briefDescription', briefDescription);
    formData.append('image', imageUrl); // Append the image file
    formData.append('linkToWebsite', linkToWebsite);
    updateAchievement(achievement._id, formData);
    handleEditDialogClose();
  };

  //onclick of cancel close the edit dialog
  const handleCancel = () => {
    // Navigate to AchievementList on cancel
    handleEditDialogClose();
  };

  //ui part
  return (
    <div className={classes.card}>
      <form>
        <FormControl className={classes.field}>
          <TextField
            label="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.studentName}
            helperText={errors.studentName}

          />
        </FormControl>
        <FormControl className={classes.field}>
          <Dropdown
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            error={!!errors.category}
          >
            <DropdownItem default label="certification" value="Certification" />
            {categories.map(option => {
              return (
                <DropdownItem
                  key={option}
                  label={option}
                  value={option}
                />
              );
            })}


          </Dropdown>
        </FormControl>
        <FormControl className={classes.field}>
          <TextField
            label="Achievement Title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
          />
        </FormControl>
        <FormControl className={classes.field}>
          <TextField
            label="Date of Achievement"
            type="date"
            value={formatDate(dateOfAchievement)}
            onChange={handleDateOfAchievementChange}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.dateOfAchievement}
            helperText={errors.dateOfAchievement}
          />
        </FormControl>
        <FormControl className={classes.field}>
          <TextField
            label="Given by"
            value={givenBy}
            onChange={(e) => setGivenBy(e.target.value)}
            error={!!errors.givenBy}
            helperText={errors.givenBy}

          />
        </FormControl>
        <FormControl className={classes.field}>
          <TextField
            label="Date of Posting"
            type="date"
            value={formatDate(dateOfPosting)}
            onChange={handleDateOfPostingChange}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.dateOfPosting}
            helperText={errors.dateOfPosting}
          />
        </FormControl>
        <FormControl className={classes.field}>
          <TextField
            label="Brief about achievement"
            multiline
            rows={4}
            value={briefDescription}
            onChange={(e) => setBriefDescription(e.target.value)}
            error={!!errors.briefDescription}
            helperText={errors.briefDescription}
          />
        </FormControl>
        <FormControl className={classes.field}>
          <TextField
            type="file"
            accept="image/*"
            onChange={(e) => setimageUrl(e.target.files[0])}
            error={!!errors.imageUrl}
            helperText={errors.imageUrl}
          />
        </FormControl>
        <FormControl className={classes.field}>
          <TextField
            label="Link to Website (optional)"
            value={linkToWebsite}
            onChange={(e) => setLinkToWebsite(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="contained"
            className={classes.button}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

EditForm.propTypes = {
  achievement: PropTypes.object.isRequired,
  handleEditDialogClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditForm);
