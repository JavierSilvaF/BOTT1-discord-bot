const Discord = require('discord.js');
const client = new Discord.Client();

const { token } = require('./config.json');
const { readdirSync } = require('fs');
const { join } = require('path');

client.commands = new Discord.Collection();
const prefix = '!';
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
//var lastMsg = (lastMsg === undefined) ? 0 : lastMsg;

const disbut = require('discord-buttons');
disbut(client);

const distube = require('distube');
player = new distube(client, { leaveOnFinish: true , emitNewSongOnly: true});

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
    if(message.content.startsWith(prefix))  {
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

//Print Out the Currently Playing EMBED
player.on("playSong", (message, queue, song) => {
    try{
        lastMsg = client.commands.get('embed').run(client, message, song)
        .then(lastMsg => console.log('let ' + lastMsg))
    } catch(error){
        console.error(error)
    }
})

client.on('clickButton', async (button) => {
    await button.defer()
    message = button.message;
    switch(String(button.id)){
        case "clickResume":
            message.content = '!resume'
            console.log(message.content);
            client.commands.get('resume').run(client, message);
        break;
        
        case "clickPause":
            message.content = '!pause'
            console.log(message.content);
            client.commands.get('pause').run(client, message);
        break;

        case "clickSkip":
            message.content = '!skip'
            client.commands.get('skip').run(client, message);
        break;

        case "clickQueue":
            message.content = '!queue'
            client.commands.get('queue').run(client, message);
        break;

        case "clickAutoplay":
            message.content = '!autoplay'
            client.commands.get('autoplay').run(client, message);
        break;
    }

});

client.player = player
client.login(token);