module.exports = {
    name: 'StudentAchievementExp',
    publisher: 'Kbhd',
    cards: [{
        type: 'StudentAchievementExpCard',
        source: './src/cards/StudentAchievementExpCard',
        title: 'StudentAchievementExp Card',
        displayCardType: 'StudentAchievementExp Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};