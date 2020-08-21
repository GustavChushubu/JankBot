const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '^';

let lazycounter = Math.floor(Math.random() * 2); 

client.once('ready', () => {
    console.log('Online');
});

client.on('message', message =>{
    lazycounter = Math.floor(Math.random() * 2);
    if(!message.content.startsWith(prefix) || message.author.bot) return;{
        if(lazycounter == 0){
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        const mutechannel = client.channels.cache.get("745924516823171083");
        const genchannel = client.channels.cache.get("745924592622764062");
        const list = client.guilds.cache.get("554478661068390440"); 
        if(command === 'start'){
            message.channel.send('Round Started!');
                for (const [memberID, memberx] of genchannel.members) {
                  memberx.voice.setChannel(mutechannel)
                    .then(() => console.log(`Moved ${memberx.user.tag}.`))
                    .catch(console.error);
                }
        }
        if(command === 'stop'){
            message.channel.send('Round Ended!');
            for (const [memberID, memberx] of mutechannel.members) {
                memberx.voice.setChannel(genchannel)
                  .then(() => console.log(`Moved ${memberx.user.tag}.`))
                  .catch(console.error);
              }
        }
        if(command === 'roulette'){
            if(message.member.id == 395068250096009217){
                message.channel.send('No Wolves allowed!');
            }
            else{
            let bullets = Math.floor(Math.random() * 6); 
            if(bullets === 1 || bullets === 4){
                message.member.kick();
                message.channel.send(message.member.displayName + ' died!');
            }
            else
            {
                message.channel.send(message.member.displayName + ' lived!');
            }
            }
        }
        if(command === 'help'){
            message.channel.send('Commands: ^help, ^roulette (2/6 bullets), ^start, ^stop');
        }
        if(command === 'wolfbomb'){
            for(membery of list.members.cache){
                membery.setNickname('Mr. Wolf');
            }
        }
    }
    else{
        message.channel.send('Oi bruv fuck u');
    }
    }
});
client.login(process.env.TOKEN);