const Discord = require('discord.js');
const config = require("../config.json");
const db = require("quick.db");
const {MessageEmbed} = require("discord.js");
const client = global.client

exports.execute = async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = config.Tag
  const sunucu = config.ServerID
  const kanal = config.TagLog
  const rol = config.FamilyRol

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(`${newUser} tag aldığı için rollerini verdim.`);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(`${newUser} tag saldığı için rollerini aldım.`);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
  

}

exports.conf = {
  event: "userUpdate"
};
