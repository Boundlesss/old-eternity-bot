const Discord = module.require('discord.js');
const ch = module.require('chalk');
const p = require('../config/permissions.json');

// Notification when member is unmuted. Also, check if the member has not been muted

module.exports.run = async (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let mID = member.id;
    let mUsername = message.member.user.tag;

    if(!message.member.roles.has(p.mute.permissions[0], p.mute.permissions.length))
        return message.reply("You do not have the correct permission(s)!");
    if(member.id == 510818658801549312)
        return message.reply("Cannot unmute *me* because I am not muted!");
    if (!member)
        return message.reply("Cannot seem to find this member! Are they part of this server?");
    if (!message.member.roles.has(p.mute.muted))
        return message.reply("Member is not muted!");

    member.removeRole(p.mute.muted).catch(console.error);
    member.addRole(p.mute.verified).catch(console.error);

    message.delete(100);
    message.channel.send(`${member} has been unmuted by <@!${message.author.id}>`);
    console.log(ch.magenta(`[LOG]: `) + ch.blue(`${message.author.tag}`) + ` (${message.author.id}) has unmuted` + ch.blue(` ${mUsername} `) + `(${mID})!`);
}

module.exports.help = {
    name: "unmute"
}