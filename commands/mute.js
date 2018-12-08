const Discord = module.require('discord.js');
const ch = module.require('chalk');
const p = module.require('../config/permissions.json');

/*
Notify whoever, that they are muted or unmuted
*/

module.exports.run = async (client, message, args) => {
    // Define variables for the member mentioned
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let mID = member.id;
    let mUsername = message.member.user.tag;

    // (USER) If the user does not have any of the (Role ID's) permissions.
    if(!message.member.roles.has(p.mute.permissions[0], p.mute.permissions.length))
        return message.reply("You do not have the correct permission(s)!")
            .then(msg => {
                msg.delete(5000);
            });

    // (USER) If the user already has the muted role    
    if(message.member.roles.has(p.mute.muted)) 
        return message.reply("Can't mute someone that is muted!")
            .then(msg => {
                msg.delete(5000);
            });

    // (USER) If the member tries to mute the bot    
    if(member.id == 510818658801549312)
        return message.reply("Really? You hate me that much. :(")
            .then(msg => {
                msg.delete(5000);
            });

    // (USER) If the member tries to mute himself.
    if(member.id == message.author.id)
        return message.reply("Cannot mute yourself!")
            .then(msg => {
                msg.delete(5000);
            });

    // (BOT) If the bot cannot find the member mentioned.
    if (!member)
        return message.reply("Cannot seem to find this member! Are they part of this server?")
            .then(msg => {
                msg.delete(5000);
            });

    const time = args.slice(1).join(' ');
    // (BOT) If no 'time' was provided: Mute forever
    if(!time) {
        member.addRole(p.mute.muted).catch(console.error);
        member.removeRole(p.mute.verified).catch(console.error);
        // Delete the message that was sent: -mute @USER 
        message.delete(100);
        message.channel.send(`${member} has been muted forever by ` + message.author.tag);
        // Log
        console.log(ch.magenta(`[LOG]: `) + ch.blue(`${message.author.tag}`) + ` (${message.author.id}) has muted` + ch.blue(` ${mUsername} `) + `(${mID}) for forever!`);
    } else {
        // Define Time. Add Muted and remove the Verified Role.
        var i = time;
        member.addRole(p.mute.muted).catch(console.error);
        member.removeRole(p.mute.verified).catch(console.error);

        // Delete the message that was sent: -mute @USER 
        message.delete(100);
        message.channel.send(`${member} has been muted for ${time} seconds by <@!${message.author.id}>`);
        console.log(ch.magenta(`[LOG]: `) + ch.blue(`${message.author.tag}`) + ` (${message.author.id}) has muted` + ch.blue(` ${mUsername} `) + `(${mID}) for ${time} seconds!`);
        
        // Wait loop for the amount of time that the user may have been muted.
        function loop() {
            i--;
            
            if (i <= 0) {
                member.removeRole(p.mute.muted).catch(console.error);
                member.addRole(p.mute.verified).catch(console.error);

                message.channel.send(`${member} has been unmuted`);

                clearInterval(loopit);
            }
        }
        var loopit = setInterval(loop, 1000);
    }
};

module.exports.help = {
    name: "mute"
}