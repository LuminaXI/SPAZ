// packages:
const { Client, Intents, Interaction } = require('discord.js');
const Discord = require('discord.js');
const { intersection } = require('lodash');
const { token } = require('./config.json');
const fs = require('fs');

// intents and mentions:
const client = new Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES,
    ]
});

// collections
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.SlashCmds = new Discord.Collection();
module.exports.client = client
require('./mongo')()

// command handler with aliases:
fs.readdirSync('./commands/').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if (err) throw err;
        var jsFiles = files.filter(f => f.split(".").pop() === "js");

        if (jsFiles.length <= 0) return console.log("🚫 >>> Can't find any commands!");    

        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`📁 >>> Command file '${file}' was loaded`)

            try {
                client.commands.set(fileGet.help.name, fileGet);
                fileGet.help.aliases.forEach(alias => {
                    client.aliases.set(alias, fileGet.help.name);
                })
            } catch (err) {
                return console.log(err);
            }
        });
    });
});

// event handler:
fs.readdirSync('./events/').forEach(file => {
        var jsFiles = fs.readdirSync('./events').filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) return console.log("🚫 >>> Can't find any events!");  
        let check = false  

        jsFiles.forEach(file => {
            const eventGet = require(`./events/${file}`)

            try {
                client.events.set(eventGet.name, eventGet)
                if(check = false) {
                    console.log(`📁 >>> Event file ${file} was loaded`)
                    check = true
                }
            } catch(error) {
                return console.log(error)
            }
        });
});

// Slash command handler: 
fs.readdirSync('./slashCommands/').forEach(dir => {
    fs.readdir(`./slashCommands/${dir}`, (err, files) => {
        if (err) throw err;
        var jsFiles = files.filter(f => f.split(".").pop() === "js");

        if (jsFiles.length <= 0) return console.log("🚫 >>> Can't find any slash commands!");    

        jsFiles.forEach(file => {
            var fileGet = require(`./slashCommands/${dir}/${file}`);
            console.log(`📁 >>> Slash command file '${file}' was loaded`)

            try {
                client.SlashCmds.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});

// main bot code:

// bot login:
client.login(token);

// => made by LunarDev!
// => twitter: @LunarTaku.
// => youtube: /LuminaLive.
// => if you have any issues contact: (ʟᴜɴᴀʀᵈᵉᵛ#9210) on discord!
