module.exports.run = async (int) => {
    const text = int.options.getString('text');
    return await int.reply({ content: text });
}

module.exports.help = {
    name: 'echo',
}