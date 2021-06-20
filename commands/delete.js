const Discord = require('discord.js')
var embedModule = require('./embed.js')

module.exports = {
    name: "delete",
    description: "delete a specific message/embed",

    async run (message, lastMsg) {
            console.log('delete');
            var deleteMessage = lastMsg;
            console.log(deleteMessage);
        try{
            var sent = await message.channel.messages.fetch(deleteMessage)
            .then(console.log('deleted: ' + deleteMessage),
            sent.delete({ timeout: 0}))
        }catch(error){
            console.log(error)
        }
    }
}