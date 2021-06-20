module.exports = {
    name: "resume",
    description: "Resume the player",

    async run (client, message) {
        console.log(message);
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first!");        
        
        if(client.player.isPaused(message) === true){
        //Resumes the player
        client.player.resume(message)
        client.player.pause(message)
        client.player.resume(message)
        }
    }
}