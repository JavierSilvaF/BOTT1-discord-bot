const Discord = require('discord.js')
const disbut = require('discord-buttons');

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
        .setAuthor('Currently Playing:', 'https://i.imgur.com/YTL30Ug.png')
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
        .setFooter('chespiman')

        const buttonResume = new disbut.MessageButton()
        .setStyle('green')
        .setLabel('Resume') 
        .setID('clickResume') 

        const buttonPause = new disbut.MessageButton()
        .setStyle('red')
        .setLabel('Pause') 
        .setID('clickPause')

        const buttonSkip = new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('Skip') 
        .setID('clickSkip')

        const buttonQueue = new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('Queue') 
        .setID('clickQueue')

        const buttonAutoplay = new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('Auto On/Off') 
        .setID('clickAutoplay')

        const buttonAR = new disbut.MessageActionRow()
        .addComponent(buttonResume)
        .addComponent(buttonPause)
        .addComponent(buttonSkip)
        .addComponent(buttonQueue)
        .addComponent(buttonAutoplay)

        var sent = await message.channel.send({
            embed : playEmbed,
            component: buttonAR
        })
        console.log('inside: ' + sent.id)
        sent.delete({ timeout: dur})
        return sent.id;
}
}