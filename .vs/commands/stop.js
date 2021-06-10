module.exports = {
    name: "stop",
    description: "Stops the queue",

    async run (client, message, args) {
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first!");
        
        client.player.stop(message);
    }
}