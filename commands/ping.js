const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    const m = await message.channel.send("Ping?");
    m.edit('Pong! - Successful connection between ' + message.author + ' and ' + client.user + ` (Latency: ${m.createdTimestamp - message.createdTimestamp}ms.)`);
}

module.exports.help = {
    name: "ping"
}