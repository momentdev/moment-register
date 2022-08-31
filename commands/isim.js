const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require("discord.js");
const config = require('../config.json');
const moment = require("moment");
moment.locale("tr")
const db = require("quick.db")


exports.execute = async (client, message, args) => {


    if(!message.member.roles.cache.has(config.Teyitci) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply('Yetkin bulunmamakta.')

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.reply(`\`Kullanım: .isim @moment Emirhan 18\``)
    
    var isim = args[1]
    var yas = args[2]
  
    if(!isim && !yas) return  message.reply(`\`Kullanım: .isim @moment Emirhan 18\``)

  
    member.setNickname(`${isim} | ${yas}`)
    
    const embed = new MessageEmbed()
    .setDescription(`Kullanıcının ismini **${isim} | ${yas}** olarak değiştirdim.`)
    .setColor('WHITE')
    .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({dynamic: true}) })
    .setFooter(config.EmbedFooter)
    message.reply({ embeds: [embed] })
    db.push(`isimler.${member.id}`, {
        Yetkili: message.author.id,
        Name: isim,
        Age: yas,
        Reason: `İsim değişikliği`
    })
};
exports.conf = {
  command: "isim",
  description: "",
  aliases: ['name']
}
