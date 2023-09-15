import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Button, } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import React from 'react';
import AchivementLogo from '../images/logo.jpg';

const styles = () => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: spacing40,
        marginLeft: spacing40,
        alignItems: 'center',
    },
    logo: {
        maxWidth: '100%',
        marginBottom: '16px',
    },
});

const StudentAchievementExpCard = (props) => {
    const { classes, cardControl: { navigateToPage } } = props;
    const handleNavigate = () => {
        navigateToPage({ route: '/' });
    };

    return (
        <div className={classes.card}>
            <Typography variant="h6">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    Student Achievement Log
                </div>
            </Typography>
            <img src={AchivementLogo} alt="Achievement Logo" className={classes.logo} />
            <Typography>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={handleNavigate} styles={{ margin: '0 auto' }}>Move to page</Button>
                </div>
            </Typography>
        </div>
    );
};

StudentAchievementExpCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object
};

export default withStyles(styles)(StudentAchievementExpCard);


