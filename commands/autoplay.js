const distube = require('distube');

module.exports = {
    name: "autoplay",
    description: "Toggles autoplay on/off",
    
    async run (client, message) {
        if(!message.member.voice.channel) return message.channel.send("You or the bot have to be in a voice channel first!");
        if(!message.content.startsWith(prefix)) return;

        let mode = client.player.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }
}