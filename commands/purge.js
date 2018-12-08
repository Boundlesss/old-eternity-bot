const Discord = module.require('discord.js');
const ch = module.require('chalk');
const p = require('../config/permissions.json');

module.exports.run = async (client, message, args) => {
    const deleteCount = parseInt(args[0], 10);

    // If User doesn't have the permission
    if(!message.member.roles.has(p.purge.permissions[0], p.purge.permissions.length))
        return message.reply("You do not have the correct permission(s)!");

        // If Value is not 2-100, then give an error
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Provide a number between 2 and 100, for the amount of messages to delete!");

        // Delete messages + the one that said "purge 100"
        var fetched = await message.channel.fetchMessages({limit: deleteCount + 1});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

        message.channel.send("Purged " + "**" + deleteCount + "**" + " Messages!")
            .then(msg => {
                msg.delete(3000);
            });
            // + message.author + ' and ' + client.user
        console.log(ch.magenta(`[LOG]: `) + `${message.author.username} has purged ${deleteCount} messages!`);
}

module.exports.help = {
    name: "purge"
}