const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require("discord.js");
const config = require('../config.json');
const moment = require("moment");
moment.locale("tr")
const db = require("quick.db")


exports.execute = async (client, message, args) => {


  if(!message.member.roles.cache.has(config.Teyitci) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply('Yetkin bulunmamakta.')

  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return message.reply(`\`Kullanım: .kayıt @moment Emirhan 18\``)
  
  var isim = args[1]
  var yas = args[2]

  if(!isim && !yas) return  message.reply(`\`Kullanım: .kayıt @moment Emirhan 18\``)

  const row = new MessageActionRow()
  .addComponents(
  
  new MessageButton()
  .setCustomId('erkek')
  .setLabel('Erkek')
  .setStyle('PRIMARY'),
  new MessageButton()
  .setCustomId('kadin')
  .setLabel('Kadın')
  .setStyle('DANGER'),
  new MessageButton()
  .setCustomId('iptal')
  .setLabel('İptal')
  .setStyle('DANGER')

  )

  member.setNickname(`${isim} | ${yas}`)
  
  const embed = new MessageEmbed()
  .setDescription(`Kullanıcının ismini **${isim} | ${yas}** olarak değiştirdim.Şimdi ise aşağıdaki buttonları kullanarak kişinin cinsiyet seçmini yapabilirsin.`)
  .setColor('WHITE')
  .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({dynamic: true}) })
  .setFooter(config.EmbedFooter)


  message.reply({ embeds: [embed], components: [row] })

  const collector = await message.channel.createMessageComponentCollector({ filter: (clicker) => clicker.user.id === message.author.id, time: 30000 });
  collector.on("collect", async (data) => {
       if(data.customId === "erkek") {
        await member.roles.add(config.Unregister)
        await member.roles.add(config.ErkekRolu1)
        await member.roles.add(config.Erkekrolu2)
        const embed = new MessageEmbed()
        .setDescription(`Kullanıcının cinsiyetini erkek olarak değiştirdim ve rollerini verdim.`)
        .setColor('WHITE')
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({dynamic: true}) })
        .setFooter(config.EmbedFooter)
        message.channel.send({ embeds: [embed] })
        db.add(`sayı.${member.id}`, +1)
        await db.push(`isimler.${member.id}`, {
          Yetkili: message.author.id,
          Name: isim,
          Age: yas,
          Rol: config.ErkekRolu1,
          Reason: `Kayıt`
        });
      }
      if(data.customId === "kadin") {
                await member.roles.add(config.Unregister)
        await member.roles.add(config.Kadinrolu1)
        await member.roles.add(config.Kadinrolu2)
        const embed = new MessageEmbed()
        .setDescription(`Kullanıcının cinsiyetini kadın olarak değiştirdim ve rollerini verdim.`)
        .setColor('WHITE')
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({dynamic: true}) })
        .setFooter(config.EmbedFooter)
        message.channel.send({ embeds: [embed] })
        db.add(`sayı.${member.id}`, +1)
        await db.push(`isimler.${member.id}`, {
          Yetkili: message.author.id,
          Name: isim,
          Age: yas,
          Rol: config.Kadinrolu1,
          Reason: `Kayıt`
        });
      }
      if(data.customId === "iptal") {
        await member.setNickname(`Kayıtsız`)
        await message.channel.send('İşlem iptal edildi.')
      }
  }); 

};
exports.conf = {
  command: "kayıt",
  description: "",
  aliases: ['k', 'e', 'kadın', 'kız', 'erkek']
}
