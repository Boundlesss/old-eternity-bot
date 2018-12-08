// Define const's for middleware, etc.
const talkedRecently = new Set();
const Discord = module.require('discord.js');
const ch = module.require('chalk');
const c = module.require('../config/colors.json');
const p = module.require('../config/permissions.json');


module.exports.run = async (client, message, args) => {
    // Define cooldown and channel ID
    const cooldown = 300000;
    const channelID = p.report.postto;

    // Define variables for the member mentioned
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let mID = member.id;
    let mUsername = message.member.user.tag;

    const reason = args.slice(1).join(' ');
    // If the bot cannot find the member mentioned.
    if (!member) 
        return message.reply("Cannot seem to find this member! Are they part of this server?")
            .then(msg => {
                msg.delete(5000);
            });
    // If the member didn't provide a reason.
    if (!reason)
        return message.reply("Please provide a reason for the report!")
            .then(msg => {
                msg.delete(5000);
            });
    // If the member reported him/herself.
    if (message.author.id === mID) 
        return message.reply("You cannot report yourself!")
            .then(msg => {
                msg.delete(5000);
            });
    // If member is part of the set (talkedRecently)
    if (talkedRecently.has(message.author.id)) {
        message.channel.send("Please wait 5 minutes before using this command again!")
    } else {
        // Send 'embed' to the #reports channel (or whatever channel is provided in the file)
        client.channels.get(channelID).send({embed: {
            title: "(REPORT)",
            color: c.embed,
            thumbnail: {
                url: "https://gabs.website/eternity/warn.png"
            },
            fields: [
                {
                    name: "Report By:",
                    value: `${message.author}`,
                    inline: true
                },
                {
                    name: "Member Reported:",
                    value: `${member}`,
                    inline: true
                },
                {
                    name: "Reason:",
                    value: `${reason}`
                }
            ],
            timestamp: new Date(),
            footer: {
                text: "Report System | Eternity" 
            }
        }});
        message.delete(500);
        message.channel.send("Report recieved! Please wait till a staff member reviews it!")
            .then(msg => {
                msg.delete(5000);
            });
        console.log(ch.magenta(`[LOG]: `) + `${message.author.tag} (${message.author.id}) has reported ${mUsername} (${mID}) for ${reason}`);

        // After Embed has been sent: Add the person to the set to stop them from using the command for 5 minutes
        talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, cooldown);
    }
}

module.exports.help = {
    name: "report"
}