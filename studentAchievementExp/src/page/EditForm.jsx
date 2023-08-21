import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  DropdownItem,
  Dropdown,
  TextField,
  Button,
} from '@ellucian/react-design-system/core';
import axios from 'axios';
import { AchievementContext } from '../context/achievementContext';
import {
    usePageControl,
    
} from '@ellucian/experience-extension-utils';
import { useHistory } from 'react-router-dom';

const EditForm = (props) => {
  const {classes, achievement, handleEditDialogClose } = props;
  const { updateAchievement } = useContext(AchievementContext);
  const { setPageTitle } = usePageControl();
  const [studentName, setStudentName] = useState(achievement.studentName);
  const [category, setCategory] = useState(achievement.category);
  const [title, settitle] = useState(achievement.title);
  const [dateOfAchievement, setDateOfAchievement] = useState(achievement.dateOfAchievement);
  const [givenBy, setGivenBy] = useState(achievement.givenBy);
  const [dateOfPosting, setDateOfPosting] = useState(achievement.dateOfPosting);
  const [briefDescription, setBriefDescription] = useState(achievement.briefDescription);
  const [imageUrl, setimageUrl] = useState(achievement.imageUrl);
  const [linkToWebsite, setLinkToWebsite] = useState(achievement.linkToWebsite);
  const history = useHistory();
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

// Setting page title
setPageTitle('Update Achievement Form');

const validateName = (name) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name);
  };
console.log(imageUrl);
console.log(achievement.imageUrl);

const handleSave = async () => {
    // Initialize error object
    const newErrors = {};
    console.log(imageUrl);
    
    if (!validateName(studentName)) {
        newErrors.studentName = 'Invalid Student name format';
    }
    if (!title) {
       newErrors.title = 'Achievement Title is required';
    }
     
    if(!dateOfAchievement) {
       newErrors.dateOfAchievement = 'Date of Achievement is required';
    }
    if(!dateOfPosting) {
       newErrors.dateOfAchievement = 'Date of Posting is required';
    }
    
    if (dateOfAchievement > dateOfPosting) {
        newErrors.dateOfPosting = 'Date of Achievement cannot be greater than Date of Posting';
    }

    if(!givenBy) {
       newErrors.givenBy = 'Date of Posting is required';
    }

    if(!briefDescription){
       newErrors.briefDescription = 'brief description is required';
    }
    else if(briefDescription.length > 500) {
        newErrors.briefDescription = 'Brief description cannot be more than 500 characters';
    }
    
    // Validation for imageUrl
    if (!imageUrl){
       newErrors.imageUrl = 'Certificate image is required';
    }else if (imageUrl) {
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

    try {
      
      const response = await axios.put(
        `http://localhost:5000/api/achievements/${achievement._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 200) {

        updateAchievement(response.data);
        console.log(response.data);
        handleEditDialogClose();
      } else {
        console.error('Failed to update achievement');
      }
    } catch (error) {
      console.error('Error updating achievement:', error);
    }
  };

  const handleCancel = () => {
    // Navigate to AchievementList on cancel
    history.push('/');

  };

  return (
    <div>
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
                 >
                 <DropdownItem label="certification" value="Certification" />
                 <DropdownItem label="paper submission" value="Paper submission" />
                 <DropdownItem label="conference" value="Conference" />
                 <DropdownItem label="awards" value="Awards" />
                 <DropdownItem label="appreciation note received" value="Appreciation note received" />
                       
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
                        value={dateOfAchievement}
                        onChange={(e) => setDateOfAchievement(e.target.value)}
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
                        value={dateOfPosting}
                        onChange={(e) => setDateOfPosting(e.target.value)}
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
                    //  value = {imageUrl}
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

export default EditForm;
