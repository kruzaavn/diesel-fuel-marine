const Discord = require('discord.js');
const client = new Discord.Client();
const {token, prefix} = require('./config.json');



client.on('ready', ()=> {
    console.log('DFM is online!')
    }

);


function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))

}

client.on('message', message => {

    let commands = ['help', 'clear_bulk', 'clear_pinned', "clear_old"];


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

        if (message.content.startsWith(`${prefix}${commands[2]}`)) {

            message.channel.messages.fetch().then((messages) => {

                message.channel.bulkDelete(messages)

            })

        }

        if (message.content.startsWith(`${prefix}${commands[3]}`)) {

            message.channel.messages.fetch().then((messages) => {

                let unpinned_messages = messages.filter(fetched_msg => !fetched_msg.pinned);

                for (let msg of unpinned_messages) {
                    sleep(1000).then(() => {message.channel.messages.delete(msg[0])})
                }
            })

        }
    }

});

client.login(token);