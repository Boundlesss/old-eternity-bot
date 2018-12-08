const Discord = module.require('discord.js');
const c = module.require('../config/colors.json');

// Finish this!
// Info on a user in the server. Then you cna get the user id, how many warns and shit like that.

module.exports.run = async (client, message, args) => {
    message.channel.send({embed: {
        "color": c.embed,
        "author": {
            "name": "Gabe here"
        },
        "footer": {
            "text": "Eternity Bot, made with love, by Gabe"
        },
        "fields": [
            {
                "name": "What is this bot?",
                "value": "-- INSERT INFO --",                
            },
            {
                "name": "What kind of commands does this bot have?",
                "value": "You can see by using the '-cmds' command!"
            }
        ]
    }});
}

module.exports.help = {
    name: "info"
}