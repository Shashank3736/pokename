const fetch = require("node-fetch");
const pkg = require("../../package.json");

module.exports = async () => {
    const request = await fetch("https://raw.githubusercontent.com/ShreyashKira/pokename/master/package.json");
    const json = await request.json();

    return {
        sameVer: json.version === pkg.version,
        originVer: json.version,
        newVer: json.version
    };
};