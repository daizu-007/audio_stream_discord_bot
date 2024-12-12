const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// クライアントを作成
const client = new Client({ intents: [GatewayIntentBits.Guilds,  GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// ボットが起動したときの処理
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// メッセージが送信されたときの処理
client.on(Events.MessageCreate, message => {
    if (message.content === 'ping') {
        message.reply('pong!');
    }
});

// ボットをログイン
client.login(process.env.DISCORD_TOKEN);