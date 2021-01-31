require('dotenv').config()

const call = require("./callbacks/Callbacks")
const inline = require("./message/inline")
const ChatPrivate = require("./message/ChatPrivate")
const start = require("./utils/start")
const bot = require('./botSettings')


bot.onText(/\/start (.*)/, start)

bot.on("message", async message =>{
  if(message.chat.type == "private" && !message.text.includes('/start')){
    const reply = new ChatPrivate()
    reply.chatPrivateAnime(message)
  }

})

bot.on("callback_query", async message => {
  const data = message.data
  const queries = new call(data.split(' '))
  
  if(data.includes('list ')){
    queries.listAnime(message)
  
  } else if (data.includes(`watch `)){
    queries.watchAnime(message)
  
  } else if(data.includes("view ") || data.includes("continue ") || data.includes("back ")){
    queries.viewAnime(message)
  
  } else if(data.includes("menu ")){
    queries.menuAnime(message)
  }

})


bot.on('inline_query', inline)

bot.on('polling_error', err => console.log(err))
