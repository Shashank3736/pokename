const pkg = require("../package.json");

module.exports = {
    pokecord: ['665301904791699476'],
    responseOnSpawn: true,
    jsonURL: "https://raw.githubusercontent.com/ShreyashKira/ShreyashKira/master/pokemon-hash.json",
    pokemonName: pokemon => `Pokemon name is: **${pokemon}**.`,
    notFound: url => `Oops! I'm not able to find this pokemon. If you know the name then please`+
    ` suggest the name in ${pkg.supportServer}\nURL: ${url}.`,
    spawnTitle: "Guess the pokémon аnd type",
    urlRegex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi,
    errorOnHash: error => `While trying to get the value we found some errors. Join our support server for help.\n`+
    `Support server: ${pkg.supportServer}\nError: || ${error} ||`
}