//Creating the Discord Client + Discord Buttons + Distube.
const Discord = require('discord.js');
const client = new Discord.Client();

const disbut = require('discord-buttons');
disbut(client);
sent = 0;

const distube = require('distube');
player = new distube(client, { leaveOnFinish: true , emitNewSongOnly: true});

//Getting Discord Token + Discord - Buttons
//const { token } = require('./config.json');
//const { prefix } = require('./config.json');

//console.log(process.env.token)
const { token } =  process.env.token;
const { prefix } =  process.env.prefix;

//Read Contents of a directory 
const { readdirSync } = require('fs');
const { join } = require('path');
client.commands = new Discord.Collection();
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

//Initial Bot Setup
client.on("error", console.error);
client.once('ready', () => {
    console.log('Beep Beep');
    client.user.setActivity('Dont shout at me or ill break | !p',{type: 'PLAYING'});
});

//Command Event Listener
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

//Print out the List Playing EMBED
player.on("playList", (message, queue, song) => {
    lastList = client.commands.get('listembed').run(client, message, song)
})

//Print out the currently Playing EMBED
player.on("playSong", (message, queue, song) => {
    lastMsg = client.commands.get('embed').run(client, message, song)
})

//Print out added song EMBED
player.on("addSong", (message, queue, song) => {
    try{
        client.commands.get('addedembed').run(message, queue, song)
    } catch(error){
        console.error(error)
    }
})

//Event Listener for Button Clicks
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

            message.content = '!s'
            console.log('skip:', sent.id)
            skipmessage = sent.id;
            console.log(message.content);
            client.commands.get('s').run(client, message, skipmessage)
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