const Discord = module.require('discord.js');
const p = module.require('../config/permissions.json');

module.exports.run = async (client, message, args) => {
    const perm = message.member.permissions;

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let mID = member.id;
    let mUsername = message.member.user.tag;

    // Check if they have the right permissions.
    if (!perm.has("KICK_MEMBERS" || "MANAGE_GUILD" || "ADMINISTRATOR"))
        return message.reply("You do not have the correct permission(s)!")
            .then(msg => {
                msg.delete(5000);
            });
    
}

module.exports.help = {
    name: "kick"
}