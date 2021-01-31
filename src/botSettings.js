const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(process.env.TOKEN,{polling: true})

module.exports = bot