const Discord = require('discord.js') 

module.exports = {
    name: "embed",
    description: "test embed",

    async run(client, message, args){
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(song.name)
        .setURL(song.url)
        .setAuthor('BOTT1', 'https://i.imgur.com/YTL30Ug.png')
        .setDescription(song.formattedDuration)
        .setThumbnail(song.thumbnail)
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        .addField('Inline field title', 'Some value here', true)
        .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp()
        .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    
    message.channel.send(exampleEmbed);
    }
}