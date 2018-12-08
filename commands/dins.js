// Define const's for middleware, etc.
const Discord = module.require('discord.js');
const tr = new Set();

module.exports.run = async (client, message, args) => {
    // Define cooldown
    const cooldown = 10000;
    // Define variables
    var jokes = ["*r/woosh*", "*Anime is just a phase*", "*w0t*", "*-_-*", "*I HaVe A £8000 pC*", "https://cdn.discordapp.com/attachments/501042490107887616/515490890236559370/whywouldyouhaveitlifesize.png", "*r/shutup*", "*free awp asmiiov!*", "*gaye*", "*that explains a lot*", "*omg gossip girls*", "*misclick*", "*crossfire*", "*0_o*", "*Schmekles*"];
    var rand = jokes[Math.floor(Math.random() * jokes.length)];

    // If member is part of the set (talkedRecently)
    if (tr.has(message.author.id)) {
        message.channel.send("Please wait 10 seconds before using this command!")
            .then(msg => {
                msg.delete(5000);
            });
    } else {
        // Send message (joke)
        message.channel.send(`**Dins:** ${rand}`);

        // Add to set (talkedRecently)
        tr.add(message.author.id);
        setTimeout(() => {
            // Delete user from set after cooldown
            tr.delete(message.author.id);
        }, cooldown);
    }
}

module.exports.help = {
    name: "dins"
}

// -mute @Devilss 600
