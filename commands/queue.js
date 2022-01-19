const Discord = require('discord.js')
const disbut = require('discord-buttons');
const { prefix } = "!";

module.exports = {
    name: "queue",
    description: "Show queue",
    
    async run (client, message, queueIndex) {
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first!");
        if (!message.content.startsWith(prefix)) return;
        
        //Declaring the Queue Embed.
        let queue = client.player.getQueue(message);
        let queueEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Current Queue:', 'https://i.imgur.com/YTL30Ug.png')
        .setThumbnail('https://i.imgur.com/YTL30Ug.png')   
        .setTimestamp()
        .setFooter('chespiman')

        //Button Handler for the Queue
        switch(queueIndex){
            case 0:
                s = 0;
                end = 10;
                if (end > queue.songs.length) end = queue.songs.length;
            break
            case 1:
                s = s - 20
                if (s < 0) s = 0;
                end = s + 10;
                if (end > queue.songs.length) end = queue.songs.length;
            break
            case 2:
                end = s + 10;
                if (end > queue.songs.length){
                    end = queue.songs.length;
                    s = end - 10}

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

        //Printing the Queue
        queueMessage = await message.channel.send({
                embed : queueEmbed,
                component: buttonQ
            })//message
        return queueMessage;
    }
}