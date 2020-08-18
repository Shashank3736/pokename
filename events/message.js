const config = require('../base/config');
const fetch = require('node-fetch');
const imghash = require('imghash');
const req = require('request').defaults({ encoding: null });
module.exports = async(client, message) => {
    if(config.pokecord.includes(message.author.id) && (process.env.SPAWN_RESPONSE ? false: true)) {
        message.embeds.forEach(async embed => {
            if(embed.title.toLowerCase().startsWith(config.spawnTitle)) {
                try {
                    const image = embed.thumbnail || embed.image;
                    const url = image.url;
                    req(url, async function(err, res, body) {
                     if(err) return message.channel.send(config.errorOnHash(err));
                     const hash = await imghash.hash(url);
                     const request = await fetch(config.jsonURL);
                     const hashJSON = await request.json();
                     const pokemonName = hashJSON[hash];
                     if(pokemonName) message.channel.send(config.pokemonName(pokemonName));
                     else message.channel.send(config.notFound(url, hash));
                    });
                } catch (error) {
                    console.error(error);
                    message.channel.send(config.errorOnHash(error));
                }
            }
        });
    }
    if(message.author.bot) return;
    const whosThatPokemonChannels = process.env.WHOS_THAT_POKEMON ? process.env.WHOS_THAT_POKEMON.split(' ') : []
    if(whosThatPokemonChannels.includes(message.channel.id)) {
        if(message.attachments && message.attachments.first()) {
            try {
                const url = message.attachments.first().url
                req(url, async function(err, res, body) {
                    if(err) return message.channel.send(config.errorOnHash(err));
                    const hash = await imghash.hash(url);
                    const request = await fetch(config.jsonURL);
                    const hashJSON = await request.json();
                    const pokemonName = hashJSON[hash];
                    if(pokemonName) message.channel.send(config.pokemonName(pokemonName));
                    else message.channel.send(config.notFound(url, hash));
                   });
            } catch (error) {
                console.error(error);
                message.channel.send(config.errorOnHash(error));
            }
        } else if(message.content.match(config.urlRegex)) {
            try {
                const url = message.content
                req(url, async function(err, res, body) {
                    if(err) return message.channel.send(config.errorOnHash(err));
                    const hash = await imghash.hash(body);
                    const request = await fetch(config.jsonURL);
                    const hashJSON = await request.json();
                    const pokemonName = hashJSON[hash];
                    if(pokemonName) message.channel.send(config.pokemonName(pokemonName));
                    else message.channel.send(config.notFound(url, hash));
                });
            } catch (error) {
                console.error(error);
                message.channel.send(config.errorOnHash(error));
            }
        }
    }
    let args = message.content.split(/ +/);
    const command = args.shift();
    if(client.commands.has(command)) {
        const cmd = client.commands.get(command);
        let isAllowed = true;
        let reason = ""
        if(cmd.userPermissions) {
            const perms = await cmd.userPermissions(message.member);
            if(!perms.allowed) {
                isAllowed = false;
                reason = perms.reason;
            }
        } if(cmd.args) {
            args = {}
            for(const arg of cmd.args) {
                if(arg.type === "url") {
                    
                }
            }
        }
        if(isAllowed) cmd.run(message, args);
        else message.channel.send(config.notAllowed(reason));
    }
}