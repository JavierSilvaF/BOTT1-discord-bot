module.exports = {
    name: "pause",
    description: "Pause the player",

    async run (client, message,) {
        console.log(message);
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first!");        
        
        if(client.player.isPlaying(message) === true){
        //Pause the player
        client.player.pause(message)
        }
    }
}