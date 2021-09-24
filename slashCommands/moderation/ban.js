module.exports.run = async (client, int) => {
    const user = int.options.getUser('target')
    let BanReason = int.options.getString('reason')
    const member = int.guild.members.cache.get(user.id)
    if (!member) return int.reply('ERROR: `INVALID_MENTION`, You either did not mention a user or the user you mentioned does not exist!')
    if(!BanReason) BanReason = 'no reason provided'

    try {
        await int.guild.members.ban(member, { reason: BanReason })
    } catch(e) {
        return int.reply('🚫 Cannot ban that user!')
    }
    int.reply(`successfully banned ${user.tag}. Farewell brother o7\n reason: \`${BanReason}\``)
}
module.exports.help = {
    name: 'ban',
}