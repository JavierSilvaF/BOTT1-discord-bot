const Discord = require('discord.js')
const disbut = require('discord-buttons');
let prefix = "!";

module.exports = {
    name: "queue",
    description: "Show queue",
    
    async run (client, message, queueIndex) {
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first!");
        if (!message.content.startsWith(prefix)) return;
        
        let queue = client.player.getQueue(message);
        let queueEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Current Queue:', 'https://i.imgur.com/YTL30Ug.png')
        .setThumbnail('https://i.imgur.com/YTL30Ug.png')   
        .setTimestamp()
        .setFooter('chespiman')

        console.log(queueIndex);
        switch(queueIndex){
            case 0:
                s = 0;
                end = 10;
                if (end > queue.songs.length) end = queue.songs.length;
            break
            case 1:
                s = s - 10
                if (s < 0) s = 0;
                end = s + 10;
                if (end > queue.songs.length) end = queue.songs.length;
            break
            case 2:
                s = end
                if (end > queue.songs.length) end = queue.songs.length;
                else end = s + 10; 
            break
            case 3:
                end = queue.songs.length;
                s = end - 10;
                if (s < 0) s = 0;
            break
            case 4:
                s = 0;
                end = 10;
                if (end > queue.songs.length) end = queue.songs.length;
            break
            default:
                s = 0;
                end = 10;
                if (end > queue.songs.length) end = queue.songs.length;
            break
        }
        //Adding the fields for each song
        for (s; s < end; s++){
            queueEmbed.addField(s+1+': ', queue.songs[s].name, false)   
        }//for
        
        //Configuring the Buttons
        const buttonFirst = new disbut.MessageButton()
        .setStyle('green')
        .setLabel('First 10') 
        .setID('clickFirst') 

        const buttonPrev = new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('Prev 10') 
        .setID('clickPrevious')

        const buttonNext = new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('Next 10') 
        .setID('clickNext')

        const buttonLast = new disbut.MessageButton()
        .setStyle('red')
        .setLabel('Last 10') 
        .setID('clickLast')

        const buttonQ = new disbut.MessageActionRow()
        .addComponent(buttonFirst)
        .addComponent(buttonPrev)
        .addComponent(buttonNext)
        .addComponent(buttonLast)

        queueMessage = await message.channel.send({
                embed : queueEmbed,
                component: buttonQ
            })//message
        return queueMessage;
    }
}