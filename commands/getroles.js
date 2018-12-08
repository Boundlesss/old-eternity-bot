const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    // let myRole = message.guild.roles.find(role => role.name === "Moderator").id;
    var i;
    const roles = ["Unverified", "Verified", "Muted", "Bot", "Support", "Contributor", "Discord Staff", "Moderator", "Administrator", "Discord Management", "Staff Management", "Developer", "Web Developer", "Lead Developer", "Owner/Founder"];

    for(i = 0; i < roles.length; i++) {
        console.log(roles[i] + ": " + message.guild.roles.find(role => role.name === roles[i]));
    }
}

module.exports.help = {
    name: "get"
}