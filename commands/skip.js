const { MessageManager, MessageAttachment } = require("discord.js");

module.exports = {
    name: "s",
    description: "Skips the current song",

    async run (client, message, skipmessage) {
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first!");
        //console.log("skipp:" + skipmessage);
        //message.channel.messages.fetch(skipmessage)
        //.then(msg => msg.delete())
        //.catch(console.error);
        
        client.player.skip(message);
    }
}//skip