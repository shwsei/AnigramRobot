const animesModel = require('./AnimesUtils')
const text = require("./Texts")
const bot = require('../botSettings')

module.exports = async message => {
  const msg = message.text
  
  if (msg.includes(' ')) {
    try {
      const anime = await animesModel.getAnimeById(msg.split(' ')[1])
      bot.sendPhoto(
        message.chat.id,
        anime.imageUrl, {
          caption: text.caption(anime),
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{
                text: 'Assistir agora',
                callback_data: `watch ${anime.id}`
              }],
              [{
                text: 'Notificar novos episódios',
                callback_data: `notification ${anime.id}`
              }],
              [{
                  text: 'Episódios',
                  callback_data: `list ${anime.id} 0`
                },
                {
                  text: 'Dicas',
                  callback_data: 'issue'
                }
              ],
            ]
          }
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

}
