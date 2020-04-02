const SlackBot = require('slackbots');
const express = require('express');
const bodyParser = require('body-parser');

// init webapp
const app = express();
app.use(bodyParser.urlencoded({ extended: false}));

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

// listen for POSTs
app.post('/toys', function(req, res) {
    const body = req.boody.Body
    res.set('Content-Type', 'text/plain')
    res.send(`You sent: ${body} to Express`)
});

app.listen(3000, (err) => {
    if (err) {
        throw err;
    }
    console.log('server started')
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