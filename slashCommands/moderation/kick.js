module.exports.run = async (client, int) => {
    const user = int.options.getUser('target')
    let KickReason = int.options.getString('reason')
    const member = int.guild.members.cache.get(user.id)
    if (!member) return int.reply('ERROR: `INVALID_MENTION`, You either did not mention a user or the user you mentioned does not exist!')
    if(!KickReason) KickReason = 'no reason provided'

    try {
        await int.guild.members.kick(member, { reason: KickReason })
    } catch(e) {
        return int.reply('🚫 Cannot kick that user!')
    }
    int.reply(`successfully kicked ${user.tag}. Farewell brother o7\n reason: \`${KickReason}\``)
}

module.exports.help = {
    name: 'kick',
}