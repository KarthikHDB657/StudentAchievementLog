import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import {
    FormControl,
    DropdownItem,
    Dropdown,
    TextField,
    Button,
} from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import {
    usePageControl,

} from '@ellucian/experience-extension-utils';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AchievementContext } from '../context/achievementContext';

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

const AchievementForm = (props) => {

    const { setPageTitle } = usePageControl();
    const { classes } = props;
    const history = useHistory();
    const [category, setCategory] = useState('');
    const [title, settitle] = useState('');
    const [dateOfAchievement, setDateOfAchievement] = useState(null);
    const [studentName, setStudentName] = useState('');
    const [givenBy, setGivenBy] = useState('');
    const [dateOfPosting, setDateOfPosting] = useState(null);
    const [briefDescription, setBriefDescription] = useState('');
    const [imageAttachment, setImageAttachment] = useState(null);
    const [linkToWebsite, setLinkToWebsite] = useState('');
    const { addAchievement } = useContext(AchievementContext);

    const [errors, setErrors] = useState({
        studentName: '',
        category: '',
        title: '',
        dateOfAchievement: '',
        givenBy: '',
        dateOfPosting: '',
        briefDescription: '',
        imageAttachment,
        linkToWebsite,

    });

    const categories = [
        'Paper submission',
        'Conference',
        'Awards',
        'Appreciation note received',
    ];

    // Setting page title
    setPageTitle('Student Achievement Form');

    const validateName = (name) => {
        const regex = /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/;
        return regex.test(name);
    };

    const handleAddAchievement = async () => {

        // Initialize error object
        const newErrors = {};

        if (!validateName(studentName)) {
            newErrors.studentName = 'Invalid Student name format';
        }
        if (!category) {
            newErrors.category = 'Please select a valid category';
        }
        if (!title) {
            newErrors.title = 'Achievement Title is required';
        }
        if (!dateOfAchievement) {
            newErrors.dateOfAchievement = 'Date of Achievement is required';
        }
        if (!dateOfPosting) {
            newErrors.dateOfPosting = 'Date of Posting is required';
        }
        if (dateOfAchievement > dateOfPosting) {
            newErrors.dateOfPosting = 'Date of Achievement cannot be greater than Date of Posting';
        }
        if (!givenBy) {
            newErrors.givenBy = 'given by is required';
        }
        if (!briefDescription) {
            newErrors.briefDescription = 'brief description is required';
        }
        if (briefDescription.length > 500) {
            newErrors.briefDescription = 'Brief description cannot be more than 500 characters';
        }
        // Validation for imageAttachment
        if (!imageAttachment) {
            newErrors.imageAttachment = 'Certificate image is required';
        } else if (imageAttachment) {
            if (!['image/jpeg', 'image/png'].includes(imageAttachment.type)) {
                newErrors.imageAttachment = 'Only JPEG and PNG images are allowed';
            }
            if (imageAttachment.size > 500 * 1024) {
                newErrors.imageAttachment = 'Image size must be less than 500KB';
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
        formData.append('image', imageAttachment); // Append the image file url
        formData.append('linkToWebsite', linkToWebsite);
        addAchievement(formData);
        history.push('/');
    };

    const handleCancel = () => {
        // Navigate to AchievementList on cancel
        history.push('/');

    };

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
                        helperText={errors.category}
                        required
                    >
                        <DropdownItem disabled label="Select a category" value="" />
                        <DropdownItem label="certification" value="Certification" />
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
                        onChange={(e) => setImageAttachment(e.target.files[0])}
                        error={!!errors.imageAttachment}
                        helperText={errors.imageAttachment}
                    />
                </FormControl>
                <FormControl className={classes.field}>
                    <TextField
                        label="Link to Website (optional)"
                        value={linkToWebsite}
                        onChange={(e) => setLinkToWebsite(e.target.value)}
                    />
                </FormControl>
                <FormControl className={classes.field}>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleAddAchievement}
                    >Add
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

AchievementForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AchievementForm);
