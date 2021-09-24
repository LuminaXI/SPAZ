const client = require('../index').client
const { createCmd, globalCmd } = require('../DataHandler')
client.on('ready', async () => {
    console.log('🟢 >>> SPAZ IS ONLINE!');
    client.user.setActivity('@lunartaku', { type: 'WATCHING' });

    globalCmd(client)
    createCmd(client, '889980636566261842')
 })