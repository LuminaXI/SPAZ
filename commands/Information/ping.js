const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix) => {
    message.channel.send('pong')
}

module.exports.help = {
    name: 'ping',
    aliases: ['p']
}