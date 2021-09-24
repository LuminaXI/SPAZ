async function createCmd(client, guildId) {
    const data = [
        // ping cmd
        {
            name: 'ping',
            description: 'sends pong',
        },

        // profile command
        {
            name: 'profile',
            description: 'create a profile',
            options: [{
                name: 'option',
                description: 'Choose something to edit, or search for one',
                type: 'STRING',
                choices: [
                    {
                        name: 'name',
                        value: 'user_name',
                    },
                    {
                        name: 'age',
                        value: 'user_age',
                    },
                    {
                        name: 'hobby',
                        value: 'user_hobby',
                    },
                    {
                        name: 'id',
                        value: 'user_id',
                    },
                    {
                        name: 'look_up',
                        value: 'lookup',
                    },
                ],
                required: true,
            }]
        },
    ]
    await client.guilds.cache.get(guildId)?.commands.set(data);
}

async function globalCmd(client) {
    const data = [

        // echo command:
        {
            name: 'echo',
            description: 'echos your text!',
            options: [{
                name: 'text',
                type: 'STRING',
                description: 'The input to echo back',
                required: true,
            }],
        },

        // purge command:
        {
            name: 'purge',
            description: 'delete up to 100 messages',
            options: [{
                name: 'amount',
                type: 'NUMBER',
                description: 'amount of messages to purge',
                required: true,
            }]
        },

        // ban command
        {
            name: 'ban',
            description: 'bans the mentioned user.',
            options: [{
                name: 'target',
                type: 'USER',
                description: 'the member you want to ban',
                required: true,
            },
            {
                name: 'reason',
                type: 'STRING',
                description: 'reason for the ban',
                required: false,
            },
        ]
        },

        // kick command
        {
            name: 'kick',
            description: 'kick the mentioned user.',
            options: [{
                name: 'target',
                type: 'USER',
                description: 'the member you want to kick',
                required: true,
            },
            {
                name: 'reason',
                type: 'STRING',
                description: 'reason for the kick',
                required: false,
            }
        ]
        },

    ]
    await client.application?.commands.set(data);
}

module.exports = {
    createCmd,
    globalCmd
}