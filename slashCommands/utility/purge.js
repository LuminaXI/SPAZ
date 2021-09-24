module.exports.run = async (int) => {
    let amount = await int.options.getNumber('amount')

    if(amount <= 100) {
        int.channel.bulkDelete(amount, true)
        return await int.reply(`**successfully purged \`${amount}\` messages!**`)
    }
}

module.exports.help = {
    name: 'purge',
}