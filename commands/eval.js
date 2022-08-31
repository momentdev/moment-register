const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require("discord.js");
const config = require('../config.json');
const moment = require("moment");
moment.locale("tr")
const db = require("quick.db")


exports.execute = async (client, message, args) => {
        if(!message.author.id == config.botowner) return message.reply('orosbu kaltak fahise pislik bunu kullanamazsın')
       if (!args[0]) return message.reply(`Kod belirt.`);
        let code = args.join(" ");

        try {
            var result = clean(await eval(code));
            if (result.includes(client.token))
                return message.reply(`token wermiyom`);
            message.channel.send(result, { code: "js", split: true });
        } catch (err) {
            message.channel.send(err, { code: "js", split: true });
        }


function clean(text) {
    if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 0 });
    text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }
}
exports.conf = {
  command: "eval",
  description: "",
  aliases: ['kod']
}
