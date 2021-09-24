module.exports.run = async (int) => {
    int.reply({ content: 'PONG!' });
}

module.exports.help = {
    name: 'ping',
}