const { MessageEmbed } = require('discord.js');
const schema = require('../../model/profiles')

module.exports.run = async (client, int) => {
    const choice = int.options.getString('option')

    let data;
    try {
        data = await schema.findOne({userId: int.user.id})
        if(!data) data = await schema.create({ userId: int.user.id })
    } catch (error) {
        console.log(error)
    }


    if(choice == 'user_name') {
        await int.reply('please send your name.')
        const filter = msg => msg.author.id == int.user.id
        await int.channel.awaitMessages({ filter, max: 1 }).then(async col => {
            if(!data.CustomId) await int.followUp(`successfully set your name to ${col.first().content}\n\nYou did not set a profile ID so one one can search you up!`)
            else await int.followUp(`successfully set your name to ${col.first().content}`)
            data.UserName = col.first().content
            await data.save()
        })
    }


if(choice == 'user_age') {
    await int.reply('please send your age in numbers only.')
    const filter = msg => msg.author.id == int.user.id
    await int.channel.awaitMessages({ filter, max: 1 }).then(async col => {
        if(isNaN(col.first().content)) return await int.followUp('Invalid age.')
        if(!data.CustomId) await int.followUp(`successfully set your age to ${col.first().content}\n\nYou did not set a profile ID so one one can search you up!`)
        else await int.followUp(`successfully set your age to ${col.first().content}`)
        data.UserAge = col.first().content
        await data.save()
    })
}


if(choice == 'user_hobby') {
    await int.reply('please send your hobby.')
    const filter = msg => msg.author.id == int.user.id
    await int.channel.awaitMessages({ filter, max: 1 }).then(async col => {
        if(!data.CustomId) await int.followUp(`successfully set your hobby to:\n\`\`\`${col.first().content}\`\`\`\n\nYou did not set a profile ID so one one can search you up!`)
        else await int.followUp(`successfully set your hobby to:\n\`\`\`${col.first().content}\`\`\``)
        data.UserHobby = col.first().content
        await data.save()
    })
}


if(choice == 'user_id') {
    await int.reply('please send your unique id `eg: LunarDev, 10923, Xx69GAMER69xX`')
    const filter = msg => msg.author.id == int.user.id
    await int.channel.awaitMessages({ filter, max: 1 }).then(async col => {
        await int.followUp(`successfully set your ID to \`${col.first().content}\``)
        data.CustomId = col.first().content
        await data.save()
    })
}


if(choice == 'lookup') {
    await int.reply('please send the id of the user you are looking up.')
    const filter = msg => msg.author.id == int.user.id
    await int.channel.awaitMessages({ filter, max: 1 }).then(async col => {

        let searchedUser = await schema.findOne({ CustomId: col.first().content })

        if(!searchedUser) return await int.followUp('User not found. Try searching again with a different id (eg: Lunar)!')

        const Embed = new MessageEmbed()
        .setTitle(searchedUser.CustomId)
        .addField('name:', `${searchedUser.UserName}`, true)
        .addField('age:', `${searchedUser.UserAge}`, true)
        .addField('hobby:', `${searchedUser.UserHobby}`)
        .setColor('RANDOM')
        .setFooter('twitter: LunarTaku')
        .setTimestamp()

        await int.followUp({ embeds: [ Embed ] })

    })
}
}


module.exports.help = {
    name: 'profile',
}