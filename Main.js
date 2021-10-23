const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

client.on("ready", async () => {

console.log("Hi");

});

client.on("message", async message => {

if(message.content.startsWith("/set global")) {

const wils = JSON.parse(fs.readFileSync("./JSONS/gc.json", "utf8"));

if(!message.member.hasPermission("MANAGE_GUILD"))
return message.reply("Berechtigung: Server Verwalten");

const channel = message.mentions.channels.first();
if(!channel) return message.reply("Gebe einen Channel an!");
if(!channel) return;

wils[message.guild.id] = {
globalchat : channel.id
};
fs.writeFile("./global.json", JSON.stringify(wils), err => {
 if(err) console.log(err);
});
message.channel.send("Gesetzt!");
}
});


client.on("message", async message => {

if(message.channel.type === "dm") return;
if(message.author.bot) return;

const wils = JSON.parse(fs.readFileSync("./JSONS/gc.json", "utf8"));
if(!wils[message.guild.id]) {
return;
}
if(message.channel.id === wils[message.guild.id].globalchat) {
const embed = new Discord.MessageEmbed();
embed.setColor("RED");
embed.setTitle(`Nutzer: ${message.author.name}`);
embed.setDescription(message.content);
embed.setThumbnail(message.author.avatarURL);
embed.setFooter(`Id: message.author.id \nServer: message.guild.name`);
msg.delete();
client.guilds.cache.forEach(g => {
try{
client.channels.cache.get(wils[g.id].globalchat).send(embed);
} catch (e) { return; } 
});
}
});
client.login("NzY5MTg5NzQxNDUwNjI1MDM1.X5LZxQ.cgZOyj8tZNEddAI3VceoErbSH8M");