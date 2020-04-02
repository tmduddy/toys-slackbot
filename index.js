const SlackBot = require('slackbots');
const express = require('express');
const { Server } = require('ws');
const path = require('path');

// set server and port values
const PORT = process.env.PORT;
const INDEX = '/index.html';

// init express server
const server = express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`listening on port ${PORT}`))


const wss = new Server({ server });

//handle connections
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});



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
    // bot.postMessageToChannel('toys', 'welcome 2 toys', params);
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
    if (user != 'UHTBJ1N7Q' && user != 'UHNBG7KJM' && user != 'UHTBM08CE') {
        return;
    }
    if (message.includes('congrats on new toy')) {
        let params = {
            icon_emoji: ':rolf:'
        }
        bot.postMessageToChannel('toys', ':rolf::rolf::rolf::rolf::rolf::rolf:\nwelcome to toys mfer\n:rolf::rolf::rolf::rolf::rolf::rolf:', params)
    }

    if (message.match(/.*should i (get|buy).*/gi)) {
        let params = {
            icon_emoji: ':rolf:'
        }
        bot.postMessageToChannel('toys', 'shut up and buy it mfer', params)
        bot.postMessageToChannel('toys', ':rolf:', {icon_emoji: ':heart:'})
    }
}