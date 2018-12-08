// Discord JS
const chalk = require('chalk');
const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
const t = require('./config/token.json');
const fs = require('fs');

const path = module.require('path');

// Command Handler //
fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log(chalk.red("No Commands to load!"));
        return;
    }

    console.log(chalk.yellow(`[LOADING ${jsfiles.length} COMMANDS]`));

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(chalk.yellow(`[LOADED]: ${f}`)); // Yellow
        client.commands.set(props.help.name, props);
    });
});

// On Ready
client.on('ready', () => {
    console.log(chalk.green(`Bot has started! - Eternity`));
    // client.user.setActivity(`and serving updates!`);
    // client.user.setStatus('online');
    var time = 1;
    var interval = setInterval(function() {
        switch (time) {
            case 1: 
                client.user.setPresence({ 
                    status: 'online',
                    game: {
                        type: "LISTENING",
                        name: 'our users!'
                    }
                });
                // console.log("1");
                time++;
                break;
            case 2:
                client.user.setPresence({
                    status: 'online',
                    game: {
                        type: "PLAYING",
                        name: "(-cmds || -info)"
                    }
                });
                // console.log("2");
                time++;
                break;
            case 3: 
                client.user.setPresence({
                    status: 'online',
                    game: {
                        type: "WATCHING",
                        name: "our changelog!",
                    }
                });
                // console.log("3");
                time++;
                break;
            case 4:
                time = 1;
                // console.log("reset");
                break;

        }
    }, 15000);
});

// On Message
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(t.prefix) !== 0) return;

    const args = message.content.slice(t.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.get(command);
    if(cmd) cmd.run(client, message, args);

});

client.on('error', (e) => console.error(e));

client.login(t.token);
