const Discord = require('discord.js');
const client = new Discord.Client();
const {token, prefix} = require('./config.json');



client.on('ready', ()=> {
    console.log('DFM is online!')
    }

);

client.on('message', message => {

    let commands = ['help', 'clear'];

    console.log(new Date().toLocaleString())

    if (message.member.hasPermission('MANAGE_MESSAGES')) {

        if (message.content.startsWith(`${prefix}${commands[0]}`)) {

            message.channel.send(`Currently supported commands\n ${commands}`)

        }

        if (message.content.startsWith(`${prefix}${commands[1]}`)) {

            message.channel.messages.fetch().then((messages) => {

                let unpinned_messages = messages.filter(fetched_msg => !fetched_msg.pinned);

                message.channel.bulkDelete(unpinned_messages)

            })

        }
    }

});

client.login(token);