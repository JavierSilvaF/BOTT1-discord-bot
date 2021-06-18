const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
const { readdirSync } = require('fs');
const { join } = require('path');

client.commands = new Discord.Collection();
const prefix = '!';
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

//initial setup
client.on("error", console.error);
client.once('ready', () => {
    console.log('Beep Beep');
    client.user.setActivity('con mis bolas | !play',{type: 'PLAYING'});
});

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if(!client.commands.has(command)) return;
        try{
            client.commands.get(command).run(client, message, args);
        } catch(error){
            console.error(error)
        }
    }
})

const distube = require('distube');
const player = new distube(client, { leaveOnEmpty: true});

//Print Out the Currently Playing EMBED
player.on('playSong', (message, queue, song) => {
//    var channelId = message.channel.id;
    let dur = song.duration*1000;

    console.log(song.name,' | ' , song.formattedDuration)
    console.log(queue.autoplay)

    const playEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(song.name)
    .setURL(song.url)
    .setAuthor('BOTT1 - Currently Playing', 'https://vectorflags.s3-us-west-2.amazonaws.com/flags/ve-circle-01.png')
    .setDescription(song.formattedDuration)
    .setThumbnail('https://i.imgur.com/YTL30Ug.png')
    .addFields(
        { name: 'Requested By', value: song.user},
        { name: 'Autoplay', value: (queue.autoplay === true ? "`On`" : "`Off`"), inline: true },
        { name: 'Queue', value: (!song.user.bot === true ? "`"+ queue.songs.length +"`" : "`Autoplay`"), inline: true },
        { name: 'Time Left', value: (!song.user.bot === true ? "`" + queue.formattedDuration +"`" : "`Autoplay`"), inline: true },
        )
    .setImage(song.thumbnail)
    .setTimestamp()
    .setFooter('chespi#5918');
    message.channel.send(playEmbed)
    .then(msg => {
    msg.delete({ timeout: dur})
  })
  .catch(console.error);
})

client.player = player;
client.login(token);