const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require("discord.js");
const config = require('../config.json');
const moment = require("moment");
moment.locale("tr")
const db = require("quick.db")


exports.execute = async (client, message, args) => {


  if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply('Yetkin bulunmamakta.')
  
    let rol = config.FamilyRol
    let tag = config.Tag
    let etiket = '00000'
    let taglılar = message.guild.members.cache.filter(s => s.user.username.includes(tag) && !s.roles.cache.has(rol)).forEach(m => m.roles.add(rol))
    message.reply(`Kullanıcı adında ${tag} olan kişilere rolleri verildi.`)
};
exports.conf = {
  command: "kontrol",
  description: "",
  aliases: ['tagliver', 'tt']
}
