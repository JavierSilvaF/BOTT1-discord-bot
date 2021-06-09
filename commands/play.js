module.exports = {
    name: "play",
    description: "Play a song from Youtube",

    async run (client, message, args) {
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first!");
        
        let search = args.join(" ");

        if(!search) return message.channel.send('Please provide a search query');

        client.player.play(message, search)
    }
}