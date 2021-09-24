const client = require('../index').client
client.on('interactionCreate', async int => {
        if(int.isCommand()) {
            let slashCmds = client.SlashCmds.get(int.commandName)
            // if(!int.member.permissions.has(slashCmds.help.memberPermissions)) return;
            if(slashCmds) slashCmds.run(client, int)
        }
});