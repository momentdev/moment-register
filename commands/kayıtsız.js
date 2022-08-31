const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require("discord.js");
const config = require('../config.json');
const moment = require("moment");
moment.locale("tr")
const db = require("quick.db")


exports.execute = async (client, message, args) => {


  if(!message.member.roles.cache.has(config.Teyitci) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply('Yetkin bulunmamakta.')

  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return message.reply(`\`Kullanım: .isim @moment Emirhan 18\``)

  member.roles.add(config.Unregister)

  member.setNickname('Kayıtsız')

  const embed = new MessageEmbed()
  .setDescription(`
Kişi kayıtsıza başarıyla atıldı.`)
  .setColor('WHITE')
  .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({dynamic: true}) })
  .setFooter(config.EmbedFooter)
  message.reply({ embeds: [embed] })
};
exports.conf = {
  command: "kayıtsız",
  description: "",
  aliases: ['unreg', 'unregister', 'teyitsiz']
}
