const Discord = require('discord.js');
const disbut = require('discord-buttons');

module.exports = {
    name: "addedembed",
    description: "Create/Send the added song Embed",

    async run (message, queue, song) {
        const addedEmbed = new Discord.MessageEmbed()
        .setColor('#ff8800')
        .setTitle(song.name)
        .setURL(song.url)
        .setAuthor('Added to the queue:', 'https://i.imgur.com/YTL30Ug.png')
        .setDescription("`Duration: "+ song.formattedDuration +"` - `Requested by: "+ song.user.username +"`")
        .setImage(song.thumbnail)
        .setTimestamp()
        .setFooter('rip groovy/hydra')

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
            embed : addedEmbed,
            component: buttonAR
            })
        }
        catch(error){
        console.error(error)
        }
    }
}
