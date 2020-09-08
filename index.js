const SecurityBot = require('./Structures/SecurityBot');
const config = require('./config.json');
const Discord = require('discord.js')
const discord = require('discord.js')
const fs = require('fs');
const client = new SecurityBot(config);
const randomPuppy = require('random-puppy');
const { error } = require('console');
const { measureMemory } = require('vm');
const { MessageEmbed, version: djsversion } = require('discord.js');
const moment = require('moment');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

//reqsMapsEtc
const usersMap = new Map();
const LIMIT = 5;
const TIME = 10000;
const DIFF = 1500;
//variables
const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

//status
setInterval(function() {

    let statuses = [
        `s!help | ${client.guilds.cache.size} Guilds securing `,
        `For ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Users here.`,
        "Vote us | s!vote",
    ]

    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, {type: "WATCHING"});

}, 5000)

//hellodmtoOwner
client.on('guildCreate', (guild) => {
    const embed = new MessageEmbed()
    .setTitle(`SecurityAPI`)
    .addField('Thank you', [
        `At first, thank you for invite SecurityAPI. I hope i can secure your server from nasty people.`,
        `Your server is the ${client.guilds.cache.size} server where SecurityAPI is active. `,
    ])
    .addField('Functions', [
        `
            ❯ ANTI SPAM&RAID Will protect your server from raids & spam attacks
            ❯ ANTI IP-Logger SecurityAPI can detect IP-Loggers and delete after he found one.
            ❯ ANTI EXPLOIT SCRIPT SecurityAPI can detect Exploits Scripts and delete after he found one.
            ❯ HTTP Warning Can detect HTTP URL and will warn users from that URL.
        `,
    ])
    .addField('Setup & Help', [
        `Write s!config to setup everything.`,
        `If you need more information, please look at the SecurityAPI docs. [SecurityAPI Documentation](https://github.com/ookamicodes/securityapi-documentation)`,
    ])

    .addField('Links', [
        "[Support Server](https://discord.gg/XsTSfrF) - [Vote for Us!](https://botlist.space/bot/748562664200077342)",
    ])
    .setFooter('SecurityAPI')
    .setTimestamp();

    guild.owner.send(embed);

  })


//consolelog guild new or left

client.on('guildCreate', guild => {
    console.log(`New guild "${guild.name}" |  now on "${client.guilds.cache.size}" servers`)
})

client.on('guildDelete', guild => {
    console.log(`Left guild "${guild.name}"  | now on "${client.guilds.cache.size}" servers`)
})
//say


//anti spam
client.on('message', message => {
    if(message.author.bot) return;

if(usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    if(difference > DIFF) {
        clearTimeout(timer);
        userData.msgCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
            usersMap.delete(message.author.id);
        }, TIME);
    } 
    else {
    ++msgCount;
    if(parseInt(msgCount) === LIMIT) {
        var role = message.guild.roles.cache.find(r => r.name === 'Muted');
        message.member.roles.add(role);
        message.delete();
        message.delete();
        message.delete();
        message.channel.send(`User: ${message.author.username} |You have been muted.`);
        console.log(`Mute on ${message.guild.name} | User: ${message.author.tag} `)
    }   else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
    }
} 
}
else {
    let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
        }, 5000);
    usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn
    });
}

});
//



client.on('message', async message => {
    if(message.author.bot) return;

    //blackist
    let blacklisted = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching","blow job", "blowjob", "blowjobs",  "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "c0ck", "c0cksucker", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "dick", "dickhead", "dildo", "dildos", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "masterb8", "masterbat", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "motherfucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "pussies", "pussy", "pussys", "rectum", "retard", "sh!+", "sh!t", "son-of-a-bitch", "s_h_i_t", "t1tt1e5", "t1tties", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank"];
    let foundInText = false;
    for (var i in blacklisted){
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }

    if (foundInText){
        message.delete();
    }
})

//httpdetect
client.on('message', async message => {
    if(message.author.bot) return;

    //blackist
    let blacklisted = ["http://"];
    let foundInText = false;
    for (var i in blacklisted){
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }

    if (foundInText){
       message.channel.send('HTTP WEBSITE | On your own risk')
    }
})

//anti ip-logger
client.on('message', async message => {
    if(message.author.bot) return;
    let blacklisted = ["https://grabify.link/", "https://blasze.com/", "https://www.ps3cfw.com/"];
    let foundInText = false;
    for (var i in blacklisted){
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }

    if (foundInText){
        message.delete();
        message.channel.send(`**User:** ${message.author.tag} | IP Logger detected!`);
        console.log(`**User:** "${message.author.tag}" | IP Logger detected! | Server: "${message.guild.name}"`)
}
})

//risk ip-logger
client.on('message', async message => {
    if(message.author.bot) return;
    let blacklisted = ["http://gestyy.com/", "https://www.bit.ly/", "http://raboninco.com/", "http://bc.vc/", "https://ouo.io/", "https://zzb.bz/", "http://adfoc.us/", "https://bitly.com/", "https://adf.ly/", "https://shorte.st/"];
    let foundInText = false;
    for (var i in blacklisted){
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }

    if (foundInText){
        message.channel.send(`**User:** ${message.author.tag} | High risk for IP-Logger!`);
        console.log(`**User:** "${message.author.tag}" | High risk for IP-Logger! | Server: "${message.guild.name}"`)
}
})

//risk script
client.on('message', async message => {
    if(message.author.bot) return;
    let blacklisted = ["XMLHttpRequest", "XMLHttpRequest.prototype.setRequestHeader", "{method:POST,headers:{authorization:this.headers.Authorization[0],user-agent:navigator.userAgent,Content-Type:application/json}",];
    let foundInText = false;
    for (var i in blacklisted){
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }

    if (foundInText){
        message.delete();
        message.channel.send(`**User:** ${message.author.tag} | Exploit Script Found! `);
        console.log(`**User:** "${message.author.tag}" | Exploit Script Found! | Server: "${message.guild.name}"`)
}
})

//reportconfig
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!reportconfig") {
  
    message.channel.send(`Make a text-channel named #reports. All reports will logged there. Make the channel only for administrators visible.`);

}
})


//muteconfig
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!muteconfig") {
    message.channel.send(`Make a role named "Muted". Give that role no permission to "send message" for every channel. The Bot will detect the role automatic. After that you dont need to do something else. This message will come even if you've already done everything.`);
    
    }
})

//testscanereact
client.on('message', async message => {
    if(message.author.bot) return;
if(message.content === "s!test123") {
    message.react('🩸');
}
})

//support server
client.on('message', async message => {
    if(message.author.bot) return;
if(message.content === "s!support") {
 message.channel.send('Join our support server!: [...] ')
}
})



//botinfo
client.on('message', async message => {
    if(message.author.bot) return;
if(message.content === "s!api") {
    const core = os.cpus()[0];
    const embed = new MessageEmbed()
        .addField('General', [
            `**❯ Client:** SecurityAPI`,
            `**❯ Servers:** ${client.guilds.cache.size} `,
            `**❯ Users:** ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`,
            `**❯ Channels:** ${client.channels.cache.size}`,
            `**❯ Creation Date:** ${utc(client.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
            `**❯ Node.js:** ${process.version}`,
            `**❯ Discord.js:** v${djsversion}`,
            '\u200b'
        ])
        .addField('System', [
            `**❯ Platform:** ${process.platform}`,
            `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
            `**❯ CPU:**`,
            `\u3000 Cores: ${os.cpus().length}`,
            `\u3000 Model: ${core.model}`,
            `\u3000 Speed: ${core.speed}MHz`,
        ])
        .addField('Links', [
            "[Invite me!](https://discord.com/api/oauth2/authorize?client_id=748562664200077342&permissions=8&scope=bot) - [Support Server](https://discord.gg/XsTSfrF) - [Vote for Us!](https://botlist.space/bot/748562664200077342)"
        ])
        .setTimestamp();

    message.channel.send(embed);

}
})
//specbotinfo
client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content === "s!specinfo") {
        message.channel.send(`Secure your Server now


        **SecurityAPI is an intelligence Discord Bot to secure your server from attacks and other things.**
        
        **Security Function:**
        
        Anti Spam & Raid can detect spam and will mute member
        
        Anti IP-LOGGER can detect IP-LOGGERS and will delete that
        
        Anti Exploit Script can detect exploits scripts and will delete these before someone get in danger
        
        Anti Swear Words can detect swear words and delete it
        
        Anti HTTP Website
        
        Report Tools report users on a server
        
        Start: s!help s!config
        
        **Links**
        
        _Bot List: _
        -https://discordbotlist.com/bots/securityapi
        -https://botlist.space/bot/748562664200077342
        -https://ayblisting.com/bots/748562664200077342
        
        
        _Invite_
        -https://discord.com/api/oauth2/authorize?client_id=748562664200077342&permissions=502787190&scope=bot
        `)
    }
})
//tos
client.on('message', async message => {
    if(message.author.bot) return;
if(message.content === "s!tos") {
    const tosembed = new MessageEmbed()
    .setTitle(`Bot Tos & Privacy Policy`)
        .addField('ToS', [
            `**Bot Guideline injuries**`,
            `- Exploitation of the system.
            - Violation of Discord TOS.
            - Exploitation of the API/BOT.
            - The use of Bots or Scripts (also against Discords TOS).
            - Trying to DDoS the API/BOT
            - Spaming on the API/BOT`,
            '\u200b'
        ])
        .addField('Privacy Policy', [
            `
            **DATA COLLECTION**
             1) This bot will log if he joins a server | guild name.
             2) SecurityAPI logs if he found a IP-Logger/Exploit Script | Username & Reason.
             3) SecurityAPI will log if someone used the s!invite command | Username.
             
             **DATA USAGE**
             1) SecurityAPI will automatic remove all console logs. No data will be saved in a database.
             2) SecurityAPI will log invite command & joined guild to make sure in wich target group the bot is. It also log Auto-mod actions.
             3) Only the highest Developer can access bot logs. 

             Have any concerns? Join our [Support Server](https://discord.gg/XsTSfrF).
             `,
            '\u200b'
        ])
        .addField('Disclamer', [
            `
            Links from commands like s!bin arent any promotion/ads from these creator.
             `,
            '\u200b'
        ])
        .addField('Links', [
            "[Invite me!](https://discord.com/api/oauth2/authorize?client_id=748562664200077342&permissions=8&scope=bot) - [Support Server](https://discord.gg/XsTSfrF) - [Vote for Us!](https://botlist.space/bot/748562664200077342)"
        ])
        .setTimestamp();

    message.channel.send(tosembed);

}
})

//func
client.on('message', async message => {
    if(message.author.bot) return;
if(message.content === "s!function") {
    const funcembed = new MessageEmbed()
        .setDescription(`**API usage | Help**`)
        .setColor('BLUE')
      
        .setDescription(`**Security API**`)
        .addField('Functions', [
            `**❯ ANTI SPAM&RAID** Will protect your server from raids & spam attacks`,
            `**❯ ANTI IP-Logger** SecurityAPI can detect IP-Loggers and delete after he found one.`,
            `**❯ ANTI EXPLOIT SCRIPT** SecurityAPI can detect Exploits Scripts and delete after he found one.`,
            `**❯ HTTP Warning ** Can detect HTTP URL and will warn users from that URL.`,
        ])
        .addField('Links', [
            "[Invite me!](https://discord.com/api/oauth2/authorize?client_id=748562664200077342&permissions=8&scope=bot) - [Support Server](https://discord.gg/XsTSfrF) - [Vote for Us!](https://botlist.space/bot/748562664200077342)"
        ])
        .setTimestamp()
    message.channel.send(funcembed);
}
})
//vote
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!vote") {

    const voteembed = new MessageEmbed()
    .setDescription(`**Vote**`)
    .setColor('BLACK')
    .setDescription(`**Vote for SecurityAPI**`)
    .addField('**Vote & Lists**', [
        `Vote for SecurityAPI to help our bot to grow.`,
        `We also rewarding our voters. Send a screenshot with your discordname/tag and you will get rewards on our server.`,

        `[botlist.space](https://botlist.space/bot/748562664200077342)`,
        `[discordbotlist](https://discordbotlist.com/bots/securityapi)`,
        `[discordextremelist](https://discordextremelist.xyz/en-US/bots/748562664200077342)`,
        `[ayblisting](https://ayblisting.com/bots/748562664200077342)`,
    ])
    .addField('Links', [
        "[Invite me!](https://discord.com/api/oauth2/authorize?client_id=748562664200077342&permissions=8&scope=bot) - [Support Server](https://discord.gg/XsTSfrF) - [Vote for Us!](https://botlist.space/bot/748562664200077342)"
    ])
    .setFooter('SecurityAPI')

    .setTimestamp()
message.channel.send(voteembed);
}
})


//help
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!help") {
    const helpembed = new MessageEmbed()
    .setDescription(`**API usage | Help**`)
    .setColor('BLACK')
    
    .setDescription(`**Security API**`)
    .addField('**General**', [
        `❯ s!help | For help`, 
        `❯ s!invite | Invite our API to your server`,
        `❯ s!vote | Vote our bot to get rewards.`, 
        `❯ s!function | Shows all functions of the API.**`, 
        `❯ s!server | Server information`,
        `❯ s!api | API information`,
        `❯ s!support | Join our support server.`,
    ])
    .addField('**Fun**', [
        `**❯ s!meme:** Get amazing memes`,

    ])
    .addField('**Moderator**', [
        `❯ s!lock | *COMING SOON*`,
        `❯ s!unlock | *COMING SOON*`,
        `❯ s!config | Shows all config options. `,
    ])
    .addField('**Config**', [
        `❯ s!muteconfig | Setup anti spam.`
    ])
    .addField('**Development**', [
        `❯ s!bin | Shows bins for your code.`,
    ])
    
    .addField('Links', [
        "[Invite me!](https://discord.com/api/oauth2/authorize?client_id=748562664200077342&permissions=8&scope=bot) - [Support Server](https://discord.gg/XsTSfrF) - [Vote for Us!](https://botlist.space/bot/748562664200077342)"
    ])
    .setFooter('SecurityAPI')

    .setTimestamp()
message.channel.send(helpembed);
}
})


//bins
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!bin") {
    const binsembed = new MessageEmbed()
    .setColor('BLACK')
    
    .setDescription(`**Code bin**`)
    .addField('**Bin**', [
        `[hastebin](https://hastebin.com/)`, 
        `[hastb](https://hasteb.in/)`,
        `[hatebin](https://hatebin.com/)`, 
        `[sourcebin](https://sourceb.in/)`,
        `[pastebin](https://pastebin.com/)`, 
    ])
    .setFooter('SecurityAPI')

    .setTimestamp()
message.channel.send(binsembed);
}

})

//helpconfig
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!config") {
    const confhelpembed = new MessageEmbed()
    .setDescription(`**API Config Help**`)
    .setColor('BLACK')
   
    .setDescription(`**Security API**`)
    .addField('Config', [
        `**❯ s!muteconfig:** | Setup anti spam.`

    ])
    .addField('Links', [
        "[Invite me!](https://discord.com/api/oauth2/authorize?client_id=748562664200077342&permissions=8&scope=bot) - [Support Server](https://discord.gg/XsTSfrF) - [Vote for Us!](https://botlist.space/bot/748562664200077342)"
    ])
    message.channel.send(confhelpembed);
}
})

//invite
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!invite") {
    const invembed = new MessageEmbed()
    .setDescription(`**API usage | Help**`)
    .setColor('BLUE')
 
    .setDescription(`**Security API**`)
    .addField('Invite', [
        `**❯ Invite our API to your server to make everything secure** https://discord.com/api/oauth2/authorize?client_id=748562664200077342&permissions=1576529526&scope=bot`,

    ])
  


    .setTimestamp()
message.channel.send(invembed);
console.log(`User ${message.author.tag} used invite command.`)
}
})
//serverinfo
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!server") {
	const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
			.setDescription(`**Guild information for __${message.guild.name}__**`)
			.setColor('BLUE')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('General', [
				`**❯ Name:** ${message.guild.name}`,
				`**❯ ID:** ${message.guild.id}`,
				`**❯ Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
				`**❯ Region:** ${regions[message.guild.region]}`,
				`**❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
				`**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
				'\u200b'
			])
			.addField('Statistics', [
				`**❯ Role Count:** ${roles.length}`,
				`**❯ Emoji Count:** ${emojis.size}`,
				`**❯ Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**❯ Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**❯ Member Count:** ${message.guild.memberCount}`,
				`**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
				`**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
				`**❯ Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])
			.addField('Presence', [
				`**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
				`**❯ Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`**❯ Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
				'\u200b'
            ])
            .addField('Links', [
                "[Invite me!](https://discord.com/api/oauth2/authorize?client_id=748562664200077342&permissions=8&scope=bot) - [Support Server](https://discord.gg/XsTSfrF) - [Vote for Us!](https://botlist.space/bot/748562664200077342)"
            ])
			.setTimestamp();
		message.channel.send(embed);
}
})
//userinfo
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!userinfo") {
    const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
    const roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);
    const userFlags = member.user.flags.toArray();
    const embed = new MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor(member.displayHexColor || 'BLUE')
        .addField('User', [
            `**❯ Username:** ${member.user.username}`,
            `**❯ Discriminator:** ${member.user.discriminator}`,
            `**❯ ID:** ${member.id}`,
            `**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
            `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
            `**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
            `**❯ Status:** ${member.user.presence.status}`,
            `**❯ Game:** ${member.user.presence.game || 'Not playing a game.'}`,
            `\u200b`
        ])
        .addField('Member', [
            `**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
            `**❯ Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
            `**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
            `**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
            `\u200b`
        ])
        .addField('Links', [
            "[Invite me!](https://discord.com/api/oauth2/authorize?client_id=748562664200077342&permissions=8&scope=bot) - [Support Server](https://discord.gg/XsTSfrF) - [Vote for Us!](https://botlist.space/bot/748562664200077342)"
        ])
    return message.channel.send(embed);
}
})
//ping
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!ping") {
    const msg = await message.channel.send('Pinging...');

    const latency = msg.createdTimestamp - message.createdTimestamp;
    const choices = ['Is this really my ping?', 'Is this okay? I can\'t look!', 'I hope it isn\'t bad!'];
    const response = choices[Math.floor(Math.random() * choices.length)];

    msg.edit(`${response} - Bot Latency: \`${latency}ms\`, API Latency: \`${Math.round(this.client.ws.ping)}ms\``);
}
})
//uptime
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!up") {
	message.channel.send(`My uptime is \`${ms(this.client.uptime, { long: true })}\``);
}
})

//test
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!ping") {
    message.channel.send(`🏓 Pong!\nLatency is ${Math.floor(message.createdTimestap - message.createdTimestap)}ms\nAPI Latency is ${Math.round(client.ping)}ms`);
}
})
//msg.edit(`🏓 Pong!\nLatency is ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms\nAPI Latency is ${Math.round(client.ping)}ms`);
//meme
client.on('message', async message => {
    if(message.author.bot) return;

if(message.content === "s!meme") {

const subReddits = ["meme", "dankmemes", "memes", "dankememe"]
const random = subReddits[Math.floor(Math.random() * subReddits.length)];
const img = await randomPuppy(random);

const embed = new Discord.MessageEmbed()
.setImage(img)
.setTitle(`**AMAZING MEME**`)
.setURL(`http://reddit.com/r/${random}`)
.setTimestamp()
.setFooter(`from /r/${random}`);
message.channel.send(embed);
    }

});







client.start(process.env.token);
