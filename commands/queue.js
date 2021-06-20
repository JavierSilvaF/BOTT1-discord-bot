const distube = require('distube');
let prefix = "!";

module.exports = {
    name: "queue",
    description: "Show queue",
    
    async run (client, message) {
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first!");
        if (!message.content.startsWith(prefix)) return;
        
        var queue = client.player.getQueue(message);

        message.channel.send(`Current queue:\n'` + queue.songs.map((song, id) =>
        `\**${id+1}**) ${song.name} - \`${song.formattedDuration}\``
        ).join("\n"));
    }
}