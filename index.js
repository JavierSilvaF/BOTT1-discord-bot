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
const skip = require('./commands/skip');
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


//Print Out the List Playing EMBED
player.on("playList", (message, queue, song) => {
    lastList = client.commands.get('listembed').run(client, message, song)
})

//Print Out the Currently Playing EMBED
player.on("playSong", (message, queue, song) => {
    lastMsg = client.commands.get('embed').run(client, message, song)
})

//Print out added song to the queue
player.on("addSong", (message, queue, song) => {
    try{
        client.commands.get('addedembed').run(message, queue, song)
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
            message.content = '!resume'
            console.log(message.content);
            client.commands.get('resume').run(client, message);

            message.content = '!skip'
            skipmessage = sent.id;
            console.log(message.content);
            client.commands.get('skip').run(client, message, skipmessage)
        break;

        case "clickQueue":
            message.content = '!queue'
            queueIndex = 4;
            client.commands.get('queue').run(client, message, queueIndex);
        break;

        case "clickAutoplay":
            message.content = '!autoplay'
            client.commands.get('autoplay').run(client, message);
        break;

        case "clickFirst":
            message.content = '!queue'
            queueIndex = 0;
            skipmessage = queueMessage.id;
            client.commands.get('delete').run(message, skipmessage);
            client.commands.get('queue').run(client, message, queueIndex);
        break;
        
        case "clickPrevious":
            message.content = '!queue'
            queueIndex = 1;
            skipmessage = queueMessage.id;
            client.commands.get('delete').run(message, skipmessage);
            client.commands.get('queue').run(client, message, queueIndex);
        break;

        case "clickNext":
            message.content = '!queue'
            queueIndex = 2;
            skipmessage = queueMessage.id;
            client.commands.get('delete').run(message, skipmessage);
            client.commands.get('queue').run(client, message, queueIndex);
        break;
        
        case "clickLast":
            message.content = '!queue'
            queueIndex = 3;
            skipmessage = queueMessage.id;
            client.commands.get('delete').run(message, skipmessage);
            client.commands.get('queue').run(client, message, queueIndex);
        break;
    
    }
});

client.player = player
client.login(token);