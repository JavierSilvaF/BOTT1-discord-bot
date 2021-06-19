const Discord = require('discord.js');

module.exports = {
    name: "embed",
    description: "Create/Send the play Embed",

    async run (client, message, args) {
            let response = client.player.getQueue(message); 
            const queue = response;
            const song = queue.songs[0];

            let dur = song.duration*1000;
            console.log(song.name,' | ' , song.formattedDuration)

            const playEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(song.name)
            .setURL(song.url)
            .setAuthor('BOTT1 - Currently Playing:', 'https://i.imgur.com/YTL30Ug.png')
            .setDescription(song.formattedDuration)
            .setThumbnail('https://i.imgur.com/YTL30Ug.png')
            .addFields(
                { name: 'Requested By', value: song.user},
                { name: 'Autoplay', value: (queue.autoplay === true ? "`On`" : "`Off`"), inline: true },
                { name: 'Queue', value: (!song.user.bot === true ? "`"+ queue.songs.length +"`" : "`Autoplay`"), inline: true },
                { name: 'Time Left', value: (!song.user.bot === true ? "`" + queue.formattedDuration +"`" : "`Autoplay`"), inline: true },
                )
            .setImage(song.thumbnail)
            .setURL(song.url)
            .setTimestamp()
            .setFooter('chespiman');
    
            message.channel.send(playEmbed)
            .then(msg => {
            console.log(message.id)
            msg.delete({ timeout: dur})
            })
            .catch(console.error);

    }
}
