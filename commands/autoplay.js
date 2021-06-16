const distube = require('distube');
let prefix = "!";

module.exports = {
    name: "autoplay",
    description: "Toggles autoplay on/off",
    
    async run (client, message, args) {
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first!");
        if(!message.content.startsWith(prefix)) return;
        const args1 = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args1.shift();
        console.log(args1)
        
        if (command == "autoplay") {
            let mode = client.player.toggleAutoplay(message);
            message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
        }
    }
}