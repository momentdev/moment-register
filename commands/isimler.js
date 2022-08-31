const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require("discord.js");
const config = require('../config.json');
const moment = require("moment");
moment.locale("tr")
const db = require("quick.db")


exports.execute = async (client, message, args) => {


  if(!message.member.roles.cache.has(config.Teyitci) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply('Yetkin bulunmamakta.')

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.reply('Birini etiketlemelisin.')
    let check = await db.has(`isimler.${user.id}`)
    if (check === false) return message.channel.send(new MessageEmbed().setAuthor(user.user.username, user.user.avatarURL({ dynamic: true })).setDescription("Bu üyenin isim kayıtına ulaşamadım!").setTimestamp().setColor(Settings.Colors.Red))
   
    let fetch = await db.get(`isimler.${user.id}`)
    let sayı = await db.get(`sayı.${user.id}`)
    /*
              Yetkili: message.author.id,
          Name: isim,
          Age: yas,
          Rol: config.Kadinrolu1
    */
    let isimler = fetch.length > 0 ? fetch.map((value, index) => ` **${value.Name} | ${value.Age}** (\`${value.Reason}\`)`).join(`\n`) : "Bu üyenin isim kayıtı bulunamadı!";

    const embed = new MessageEmbed()
    .setDescription(`
Üyenin toplamda \`${sayı}\` isim kaydı bulunuyor.
${isimler}    
`)
    .setColor('WHITE')
    .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({dynamic: true}) })
    .setFooter(config.EmbedFooter)
    message.reply({ embeds: [embed] })
};
exports.conf = {
  command: "isimler",
  description: "",
  aliases: ['names']
}
