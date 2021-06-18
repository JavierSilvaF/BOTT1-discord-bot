const { MessageManager, MessageAttachment } = require("discord.js");

module.exports = {
    name: "skip",
    description: "Skips the current song",

    async run (client, message, args, channelID) {
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first!");

//        channel.fetchMessages(channelID)
//       .then(fetchedMessages => {
//        const messagesToDelete = fetchedMessages.filter(msg => !(msg.author.id === '789242180031873034' && msg.content.includes('Esta Sonando:')));
//         })
//        .catch(console.error);

//        for (var i = 0; i < BadWords.length; i++){
//            if(content.includes(BadWords[i])){
//               message.delete();
//                break
//            }
//        }

        client.player.skip(message);
    }
}//skip