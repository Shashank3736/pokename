const imghash = require('imghash');
const req = require('request').defaults({ encoding: null });
const config = require('../base/config')
module.exports = {
    args: [{
        id: "url",
        type: "url"
    },{
        id: "name",
        type: "string"
    }],
    run: async(message, {url, name}) => {
        
    }
}