const Discord = require('discord.js')
const disbut = require('discord-buttons');

module.exports = {
    name: "listembed",
    description: "Create/Send the play Embed",
    
    async run (client, message,args) {
        const queue = client.player.getQueue(message);
        const song = queue.songs[0];

        console.log(song.name,' | ' , song.formattedDuration)

        const listEmbed = new Discord.MessageEmbed()
        .setColor('#ff8800')
        .setTitle('Added a New Playlist!:', 'https://i.imgur.com/YTL30Ug.png')
        .setAuthor('Currently Playing:', 'https://i.imgur.com/YTL30Ug.png')
//        .setDescription("`First Song: "+song.name+" - Requested by: "+song.user+"`")
        .setThumbnail('https://i.imgur.com/YTL30Ug.png')
        .addFields(
            { name: 'Requested By', value: song.user},
            { name: 'Autoplay', value: (queue.autoplay === true ? "`On`" : "`Off`"), inline: true },
            { name: 'Queue', value: "`" + queue.songs.length+"`", inline: true },
            { name: 'Time Left', value: "`" + queue.formattedDuration+"`", inline: true },
            )
        .setImage(song.thumbnail)
        .setTimestamp()
        .setFooter('chespiman')

        const buttonSkip = new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('Skip') 
        .setID('clickSkip')

        const buttonQueue = new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('Queue') 
        .setID('clickQueue')
        
        const buttonAR = new disbut.MessageActionRow()
        .addComponent(buttonSkip)
        .addComponent(buttonQueue)

        try{message.channel.send({
            embed : listEmbed,
            component: buttonAR
            })
        }
        catch(error){
        console.error(error)
        }
    }
}