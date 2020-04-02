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
        icon_emoji: ":rolf:"
    }
    bot.postMessageToChannel('toys', 'welcome 2 toys', params);
});

// err handler
bot.on('error', (err) => console.log(err));

//message handler
bot.on('message', (data) => {
    if(data.type != 'message' || data.subtype == 'message_changed') {
        return;
    }
    handleMessage(data.text, data.user);
});

// respond to messages
function handleMessage(message, user) {
    if (user != 'UHTBJ1N7Q' || user != 'UHNBG7KJM' || user != 'UHTBM08CE') {
        return;
    }
    if (message.includes('new toy')) {
        let params = {
            icon_emoji: ':rolf:'
        }
        bot.postMessageToChannel('toys', ':rolf::rolf::rolf::rolf::rolf::rolf:\nwelcome to toys mfer\n:rolf::rolf::rolf::rolf::rolf::rolf:', params)
    }
}