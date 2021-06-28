const { MessageManager, MessageAttachment } = require("discord.js");

module.exports = {
    name: "skip",
    description: "Skips the current song",

    async run (client, message, skipmessage) {
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first!");
        console.log("skip:" + skipmessage);
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
//        client.commands.get('delete').run(client, message, lastMsg)
//        .then(console.log('Message Deleted Successfully'))
        client.player.skip(message);
    }
}//skip