const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "test command",

    async run(client, message, args){


        const ping = new Discord.MessageEmbed()
        .setDescription('PING PONG BABEY');

        message.channel.send(ping);
    }
}