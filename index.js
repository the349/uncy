console.log("uncy bot is starting up")
console.log("uncy bot is loading files")
const Discord = require("discord.js")
//const commando = require("discord.js-commando")
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const fs = require('fs')
console.log("uncy bot is loading vars")
const embedRed = 0xff0000
const embedOrange = 0xff790c
const embedYellow = 0xffff00
const embedGreen = 0x00ff00
const embedBlue = 0x0064ff
const embedPurple = 0x6a00b0
const embedMagenta = 0x9600ff
const embedPink = 0xff00ff
const embedBlack = 0x000000
const embedWhite = 0xffffff
const embedGray = 0x777777
const version = "v0.0.1"
const api_version = "v51"
const prefix = "u-"
console.log("uncy bot is loading discord bot")
const bot = new Discord.Client()
let messageCount = 0
let yesnorid = 0
let serverData = {
    servers:{
        users: {},
        channels: {},
        guilds: {}
    }
}
function runCommand(i, e) {
    if(i && e) {
        if(command == i) {
            e()
        }
    }
}
function createEmbed() {
    let cembed = new Discord.RichEmbed()
    cembed.setAuthor(bot.user.tag, bot.user.displayAvatarURL)
    cembed.setColor(embedPurple)
    return cembed
}
let uptime = 0
let uptimeTimer
if(process.env.BOT_TOKEN) {uptimeTimer = setInterval(function () {uptime++},1000*60*60)}
bot.on("ready" , () => {
    bot.user.setActivity("I'm NICE")
    console.log("uncy bot is ready")
    //bot.user.send("I'm here")
})
bot.on("message", async (message) => {
    if(message.author.bot){return}
    if(message.content.indexOf(prefix) !== 0){return}
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    //var command = message.content.toLowerCase().split(prefix.toLowerCase())
    if(command == "nice_words") {
        console.log("NICE is finding nice words")
        message.channel.sendMessage("you're all nice :)")
    }
    if(messageCount == 100) {
        console.log("yay 100 messages")
        message.channel.sendMessage("yay I've read, moderated, and answed 100 messages")
    }
    if(messageCount == 1000) {
        console.log("yay 1000 messages")
        message.channel.sendMessage("yay I've read, moderated, and answed 1000 messages")
    }
    if(messageCount == 10000) {
        console.log("yay 10000 messages")
        message.channel.sendMessage("yay I've read, moderated, and answed 10000 messages")
    }
    if(messageCount == 10000) {
        console.log("yay 100000 messages")
        message.channel.sendMessage("yay I've read, moderated, and answed 100000 messages")
    }
    if (message.content.toLowerCase().includes("fuck") || message.content.toLowerCase().includes("bitch") || message.content.toLowerCase().includes("ass") || message.content.toLowerCase().includes("shit") || message.content.toLowerCase().includes("penis") || message.content.toLowerCase().includes("pussy") || message.content.toLowerCase().includes("vagina") || message.content.toLowerCase().includes("sex")) {
        let user = message.author
        let reason = "No Swearing"
        message.guild.member(user).kick(reason + "\n You can rejoin if you imporve your behavior")
        const kembed = new Discord.RichEmbed()
        .setAuthor(`${user.username} has been kicked from the server.`, user.displayAvatarURL)
        .addField("Kick information", `**Kicked User:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
        .setColor(embedRed);
        message.channel.send({
            embed : kembed
        })
        message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);
    }
    if(command == "ping") {
        const m = await message.channel.send("Ping?");
        //console.log(m)
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. api Latency is ${Math.round(bot.ping)}ms`)
    }
    if(command == "help") {
        const kembed = createEmbed()
        .addField("Here is a list of commands", {image: "https://github.com/the349/NICE/blob/master/icons/help.png"})
        message.author.send({
            embed:kembed
        })
    }
    if(command == "info") {
        const iembed = createEmbed()
        .addField(`**Version**`, version)
        .addField(`**API version**`, api_version)
        .addField(`**Servers**`, bot.guilds.size)
        .addField(`**Uptime**`, `${uptime}h`)
        message.channel.send({
            embed:iembed
        })
    }
    /*if(command == "setup") {
        yesnorid = 1
        const sembed = new Discord.RichEmbed()
        sembed.setAuthor(bot.user.tag, bot.user.displayAvatarURL)
        sembed.addField("Hi. I'm uncy, I'm here to help and have fun. I just need a couple details and you'll be on your way! so are you ready?")
    }
    if(yesnorid = 1) {
        if(message.content.toLowerCase = "yes" || message.content.toLowerCase = "no") {
            if()
        }
    }*/
    if(command == "ban") {
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Can't find user!");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Looking at my rules I can't do that");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!!!");
        let bEmbed = new Discord.RichEmbed()
        .setDescription("~Ban~")
        .setColor("#bc0000")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);
        let incidentchannel = message.guild.channels.find(`name`, "incidents");
        if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
        message.guild.member(bUser).ban(bReason);
        incidentchannel.send(bEmbed);
    }
    if(command == "kick") {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
        let kEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Tiime", message.createdAt)
        .addField("Reason", kReason);
        let kickChannel = message.guild.channels.find(`name`, "incidents");
        if(!kickChannel) return message.channel.send("Can't find incidents channel.");
        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kEmbed);
    }
    if(command == "avatar") {
        let auser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!auser) {return message.channel.send("Can't find user!")}
        let aembed = createEmbed()
        aembed.addField(auser.username, `This is ${auser.tag}'s avatar`)
        aembed.setImage(auser.avatarURL)
        message.channel.send({
            embed: aembed
        })
    }
    if(command == "roll") {
        let dice = Math.floor(Math.random() * 6)
        let rembed = new Discord.RichEmbed()
        rembed.setColor(embedPurple)
        rembed.setAuthor(bot.user.tag, bot.user.displayAvatarURL)
        rembed.addField(`You got a ${dice}`)
        message.channel.send({
            embed: rembed
        })
    }
    if(command == "points") {
        let pembed = createEmbed()
        pembed.addField("The point system is not up yet.", `Sorry ${message.author.tag}`)
        message.channel.send({
            embed: pembed
        })
    }
    /*if(command == "mute") {
        let auser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let membed = createEmbed()
        membed.addField('Muted')
        membed.setDescription(`User ${auser} was muted`)
        message.channel.send({
            embed: membed
        })
    }*/
    if(command == "flip") {
        let coin = ""
        let fembed = createEmbed()
        let x = (Math.floor(Math.random() * 2) == 0);
        if(x) {
            coin = "heads"
        } else {
            coin = "tails"
        }
        fembed.addField(`${coin}!`, `Have fun with your coin ${message.author.tag}!`)
        message.channel.send({
            embed: fembed
        })
    }
    //console.log(command)
    messageCount++
    console.log("message #"+messageCount+":"+message.content+" - "+message.author.tag)
})
bot.on("guildMemberAdd", member => {
    let channel = member.guild.channels.find(ch => ch.name === 'member-log')
    if (!channel) {return}
    let jembed = createEmbed()
    let mjembed = createEmbed()
    jembed.addField(`Welcome!`, `Welcome to the server <${member.id}>`)
    mjembed.addField(`New member`, `User <${member.id}> has joined`)
    member.send({
        embed: jembed
    })
    channel.send({
        embed:jembed
    })
})
bot.login(process.env.BOT_TOKEN)
