const Discord = require('discord.js');

const client = new Discord.Client();

const fetch = require("node-fetch");

const prefix = '^';

const unURL = 'http://arkdedicated.com/xbox/cache/unofficialserverlist.json';

const ofURL = 'http://arkdedicated.com/xbox/cache/officialserverlist.json';

var unList;

var ofList;

client.once('ready', () => {
    console.log('Online');
    client.user.setActivity('^help', {url: 'https://www.youtube.com/watch?v=d1YBv2mWll0', type: 'STREAMING'})
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);

    fetch(unURL)
    .then(res => res.json())
    .then((out) => {
        unList = out;
    })
    .catch(err =>{ throw err});
    fetch(ofURL)
    .then(res => res.json())
    .then((out) => {
        ofList = out;
    })
    .catch(err =>{ throw err});

    setInterval(function(){
        fetch(unURL)
        .then(res => res.json())
        .then((out) => {
            unList = out;
        })
        .catch(err =>{ throw err});
        fetch(ofURL)
        .then(res => res.json())
        .then((out) => {
            ofList = out;
        })
        .catch(err =>{ throw err});
    },20000);
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
            var str = '';
            var result = '';
            var searchS = '';
            searchS = args.join(' ');
            console.log(searchS);
                unList.forEach(element => {
                    str = element.Name;
                    str = str.toLowerCase();
                    if(str.search(searchS.toLowerCase()) !== -1){
                        result += '**Name: ' + element.Name + '**' +
                        '\n**IP: **' + element.IP + 
                        '\n**Players: **' + element.NumPlayers + '/' + element.MaxPlayers +
                        '\n**Port: **' + element.Port + '\n\n';
                        if(result.length >= 1600){
                            message.channel.send(result);
                            result = '';
                        }
                    }
                });
                message.channel.send(result);
        }
        if(command === 'st'){
            var str = '';
            var result = '';
            console.log(args[0]);
                ofList.forEach(element => {
                    str = element.Name.toLowerCase();
                    if(str.includes('smalltribes')){
                        if(str.endsWith(args[0])){
                            result += '**Name: ' + element.Name + '**' +
                            '\n**IP: **' + element.IP + 
                            '\n**Players: **' + element.NumPlayers + '/' + element.MaxPlayers +
                            '\n**Port: **' + element.Port + '\n\n';                            
                            if(result.length >= 1600){
                                message.channel.send(result);
                                result = '';
                            }
                        }
                    }
                });
                message.channel.send(result);
        }
        if(command === 'offi'){
            var str = '';
            var result = '';
            console.log(args[0]);
                ofList.forEach(element => {
                    str = element.Name.toLowerCase();
                    if(!str.includes('smalltribes')){
                        if(str.endsWith(args[0])){
                            result += '**Name: ' + element.Name + '**' +
                            '\n**IP: **' + element.IP + 
                            '\n**Players: **' + element.NumPlayers + '/' + element.MaxPlayers +
                            '\n**Port: **' + element.Port + '\n\n';                            
                            if(result.length >= 1600){
                                message.channel.send(result);
                                result = '';
                            }
                        }
                    }
                });
                message.channel.send(result);
        }
        if(command === 'kratos'){
            
        }
        if(command === 'help'){
            message.channel.send('Commands: ^help, ^roulette (2/6 bullets), ^start, ^stop, ^dedi <name>, ^offi, ^st (^offi and ^st are WIP)');
        }
    }
});
client.login(process.env.TOKEN);
