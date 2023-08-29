import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  Table,
  TableRow,
  TableCell,
  TableBody,
  
} from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';

const styles = () => ({
  
  viewFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  detailsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ccc',
    marginTop: '10px',
    marginBottom: '20px',
    '& td': {
      padding: '8px',
      borderBottom: '1px solid #ccc',
    },
    '& td:first-child': {
      fontWeight: 'bold',
      width: '30%',
    },
  },
  imageCell: {
    textAlign: 'center',
  },
  fullImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  closeButtonContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
});


const ViewForm = ({ classes, achievement, handleViewDialogClose }) => {
    return (
      <div className={classes.viewFormContainer}>
        <Typography variant="h6" className={classes.sectionHeaders}>
          Achievement Details
        </Typography>
        <Table className={classes.detailsTable}>
          <TableBody>
            <TableRow>
              <TableCell colSpan="2" className={classes.imageCell}>
                <img src={`http://localhost:5000/${achievement.imageUrl}`} alt={achievement.title} className={classes.fullImage} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Student Name:</strong></TableCell>
              <TableCell>{achievement.studentName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Category:</strong></TableCell>
              <TableCell>{achievement.category}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Title:</strong></TableCell>
              <TableCell>{achievement.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Date of Achievement:</strong></TableCell>
              <TableCell>{achievement.dateOfAchievement}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Date of Posting:</strong></TableCell>
              <TableCell>{achievement.dateOfPosting}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className={classes.closeButtonContainer}>
          <Button variant="contained" onClick={handleViewDialogClose}>
            Close
          </Button>
        </div>
      </div>
    );
  };
  
  
  ViewForm.propTypes = {
    classes: PropTypes.object.isRequired,
    achievement: PropTypes.object.isRequired,
    handleViewDialogClose: PropTypes.func.isRequired,
  };
  
  export default withStyles(styles)(ViewForm);
  