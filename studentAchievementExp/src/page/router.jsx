import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import AchievementList from './Achivementlist';
import AchievementForm from './AchievementForm';
import { AchievementProvider } from '../context/achievementContext';

// for more information on react router: https://v5.reactrouter.com/web/guides/quick-start

const RouterPage = (props) => {
    return (
        <AchievementProvider>
        <Router basename={props.pageInfo.basePath}>
            <Switch>
                <Route exact path='/'>
                    <AchievementList {...props} />
                </Route>
            </Switch>
            <Switch>
                <Route path ='/add-achievement'>
                    <AchievementForm {...props}/>
                </Route>
            </Switch>
        </Router>
        </AchievementProvider>
    );
};

RouterPage.propTypes = {
    pageInfo: PropTypes.object
};

export default RouterPage;