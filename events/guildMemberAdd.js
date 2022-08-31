const Discord = require("discord.js");
const client = global.client;
const moment = require("moment");
moment.locale("tr")

exports.execute = async (member) => {


    const config = require('../config.json')

        var aylar = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"
    }
        member.roles.add(config.Unregister);
        member.roles.add(config.Unregister);
        member.setNickname(`${config.Tag} Kayıtsız`);
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
        var üs = üyesayısı.match(/([0-9])/g)
        üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
        if(üs) {
          üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
            return {
              '0': `<a:sifir:1013031546673963039>`,
              '1': `<a:bir:1013031493070762065>`,
              '2': `<a:iki:1013031495071445072>`,
              '3': `<a:uc:1013031496732397649>`,
              '4': `<a:dort:1013031498506584135>`,
              '5': `<a:bes:1013031500352069642>`,
              '6': `<a:alti:1013031538570563594>`,
              '7': `<a:yedi:1013031540315390033>`,
              '8': `<a:sekiz:1013031542806827018>`,
              '9': `<a:dokuz:1013031545004638278>`}[d];
            })
          }  
        member.guild.channels.cache.get(config.KayitKanali).send(`
<a:yildizz:1013026357338439742> **✰ S T A R W I D E**'a hoşgeldin ${member} - \`${member.id}\`

Sunucumuz seninle birlikte ${üyesayısı} üyeye ulaştı!
Hesabın **${(`${moment(member.user.createdTimestamp).format('DD')} ${aylar[moment(member.user.createdTimestamp).format('MM')]} ${moment(member.user.createdTimestamp).format('YYYY HH:mm')}`)}** tarihinde oluşturulmuş.

Tagımızı (${config.Tag}) alarak bize destek olabilirsin! <#1012460593187397633> kanalındaki kurallarımızı okuduğun varsayılarak kaydedileceksin!
Kayıt olmak için <#1012460592981868556> kanalında bekleyebilirsin. Yetkililerimiz seninle ilgilenecektir! <@&${config.Teyitci}>

        `);
    
};

exports.conf = {
  event: "guildMemberAdd"
};