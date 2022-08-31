const Discord = require("discord.js");
const client = global.client;
const moment = require("moment");
moment.locale("tr")

exports.execute = async () => {

 client.user.setPresence({ activities: [{ name: 'with discord.js' }] });

};

exports.conf = {
  event: "ready"
};