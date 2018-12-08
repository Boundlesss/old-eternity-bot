const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    message.channel.send({embed: {
        title: "Test"
    }});
}

module.exports.help = {
    name: "vkick"
}