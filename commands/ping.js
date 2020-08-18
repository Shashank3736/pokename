module.exports = {
    description: "Ping Pong!",
    run: async (message) => {
        message.channel.send("Pong! "+message.client.ws.ping+"ms.")
    }
}