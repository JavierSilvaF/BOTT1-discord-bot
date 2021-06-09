module.exports = {
    name: "skip",
    description: "Skips the current song",

    async run (client, message, args) {
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first!");
        
        client.player.skip(message);
    }
}