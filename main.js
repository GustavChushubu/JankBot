const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '^';

client.once('ready', () => {
    console.log('Online');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;{

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        const mutechannel = client.channels.cache.get("745924516823171083");
        const genchannel = client.channels.cache.get("745924592622764062");
        if(command === 'getchannelid'){
            const vChannel = message.member.voice.channel;
            message.channel.send(vChannel.id);
        }
        if(command === 'getmyid'){
            message.channel.send(message.member.id);
        }
        if(command === 'start'){
            console.log(genchannel.members);
            //genchannel.join();
            //message.member.voice.setChannel(mutechannel, "Round has started");
            message.channel.send('Round Started!');
                for (const [memberID, memberx] of genchannel.members) {
                  memberx.voice.setChannel(mutechannel)
                    .then(() => console.log(`Moved ${memberx.user.tag}.`))
                    .catch(console.error);
                }
        }
        if(command === 'stop'){
            console.log(mutechannel.members);
            //mutechannel.join();
            //message.member.voice.setChannel(genchannel, "Round has ended");
            message.channel.send('Round Ended!');
            for (const [memberID, memberx] of mutechannel.members) {
                memberx.voice.setChannel(genchannel)
                  .then(() => console.log(`Moved ${memberx.user.tag}.`))
                  .catch(console.error);
              }
        }
    }
});

client.login('NzQ1NjA3NDYyMzI5MTIyODc3.Xz0PDw.zOQaGB09oUYWVz_qxK-SXkJzA6Q');