const Discord = require('discord.js');

module.exports = {
    name: "delete",
    description: "delete a specific message/embed",

    async run (message, skipmessage) {
        message.channel.messages.fetch(skipmessage)
        .then(msg => msg.delete())
        .catch(console.error);
    }
}