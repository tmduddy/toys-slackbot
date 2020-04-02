const SlackBot = require('slackbots');
const axios = require('axios');

// init bot
const bot = new SlackBot({
    token: process.env.SLACK_BOT_TOKEN,
    name: 'toybot'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ":cat:"
    }

    bot.postMessageToChannel('toys', 'welcome 2 toys', params);
});