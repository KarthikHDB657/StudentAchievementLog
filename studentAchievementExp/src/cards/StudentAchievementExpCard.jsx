import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Button } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    }
});

const StudentAchievementExpCard = (props) => {
    const { classes, cardControl: { navigateToPage } } = props;
    const handleNavigate = () => {
        navigateToPage({ route: '/' });
    };

    return (
        <div className={classes.card}>
            <Typography variant="h2">
                Student Achievement Log
            </Typography>
            <Typography>
                <Button onClick={handleNavigate}>Move to page</Button>
            </Typography>
        </div>
    );
};

StudentAchievementExpCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object
};

export default withStyles(styles)(StudentAchievementExpCard);


