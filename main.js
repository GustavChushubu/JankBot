const Discord = require('discord.js');

const client = new Discord.Client();

const fetch = require("node-fetch");

const prefix = '^';

client.once('ready', () => {
    console.log('Online');
    client.user.setActivity('^help', {url: 'https://www.youtube.com/watch?v=d1YBv2mWll0', type: 'STREAMING'})
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;{
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        const mutechannel = client.channels.cache.get("745924516823171083");
        const genchannel = client.channels.cache.get("745924592622764062");
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
        if(command === 'dedi'){
            let url = 'http://arkdedicated.com/xbox/cache/unofficialserverlist.json';
            var str = '';
            var result = '';
            fetch(url)
            .then(res => res.json())
            .then((out) => {
                out.forEach(element => {
                    str = element.Name.toLowerCase();
                    if(str.includes(args[0].toLocaleLowerCase())){
                        result += '**Name: ' + element.Name + '**' + '\nIP: ' + element.IP + '\nPort: ' + element.Port + '\n\n';
                        if(result.length >= 1600){
                            message.channel.send(result);
                            result = '';
                        }
                    }
                });
            })
            .catch(err =>{ throw err});
        }
        if(command === 'offi'){
            let url = 'http://arkdedicated.com/xbox/cache/officialserverlist.json';
            var str = '';
            var result = '';
            fetch(url)
            .then(res => res.json())
            .then((out) => {
                out.forEach(element => {
                    str = element.Name.toLowerCase();
                    if(str.endsWith(args[0].toLocaleLowerCase())){
                        result += '**Name: ' + element.Name + '**' + '\nIP: ' + element.IP + '\nPort: ' + element.Port + '\n\n';
                        if(result.length >= 1600){
                            message.channel.send(result);
                            result = '';
                        }
                    }
                });
            })
            .catch(err =>{ throw err});
        }
        if(command === 'help'){
            message.channel.send('Commands: ^help, ^roulette (2/6 bullets), ^start, ^stop, ^dedi <name>, ^offi');
        }
    }
});
client.login(process.env.TOKEN);