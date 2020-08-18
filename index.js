const { Client, Collection } = require("discord.js");
require('dotenv').config();
const client = new Client();
client.commands = new Collection();
const fs = require('fs');

fs.readdir('./commands', (_err, files) => {
    files.forEach(file => {
        if(!file.endsWith('.js')) return;
        let commandFile = require('./commands/'+file);
        let commandName = commandFile.split('.')[0];
        if(!client.commands.has(commandName)) {
            client.commands.set(commandName, commandFile);
            console.log(`👌 Command loaded: ${commandName}`);
        } else {
            throw new Error(`${commandName} is already loaded!.`);
        }
    });
});

fs.readdir('./events', (_err, files) => {
    files.forEach(file => {
        if(!file.endsWith('.js')) return;
        let eventFile = require('./events/'+file);
        let eventName = file.split('.')[0];
        console.log(`👌 Event loaded: ${eventName}`);
        client.on(eventName, eventFile.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.login()