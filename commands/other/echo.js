const Discord = require("discord.js");
const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args, prefix) => {
  var text = message.content.split(" ").slice(1).join(" ");
  if (!text)
    return message.channel.send(
      "Please use it like this example:\n**s!say Bottom Text**"
    );
  message.channel.send(text);
  message.delete();
};

module.exports.help = {
  name: "echo",
  aliases: ["say"],
};
