const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

// クライアントを作成
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// コマンドを格納するCollectionを作成
client.commands = new Collection();

// コマンドファイルを読み込む
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// コマンドを登録
for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
}

// コマンド実行処理
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;  // コマンド以外は無視
    const command = interaction.client.commands.get(interaction.commandName);
    // コマンドの実行とエラーハンドリング
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'エラーが発生しました', ephemeral: true });
    }
});

// ボットが起動したときの処理
client.once(Events.ClientReady, readyClient => {
	console.log(`${readyClient.user.tag}でログインしました。`);
});

// ボットをログイン
console.log("起動しました。ログインします。");
client.login(process.env.DISCORD_TOKEN);