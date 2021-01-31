const animes = require('../utils/AnimesUtils');
const bot = require('../botSettings')

class ChatPrivate {


  async chatPrivateAnime(message) {

    try {

      const query = await animes.getAnimeByName(message.text);

      if (query != 0) {
        let arryAnime = []

        query.forEach(anime => {

          arryAnime.push([{
            text: anime.name,
            callback_data: `menu ${anime.id}`
          }])
        })

        bot.sendPhoto(message.chat.id, "https://casalotaku.files.wordpress.com/2013/03/311.jpg", {
          caption: "<b>Hum, encontrei estes animes!</b>",
          parse_mode: "HTML",
          reply_to_message_id: message.message_id,
          reply_markup: {
            inline_keyboard: arryAnime
          }
        })

      } else {
        bot.sendMessage(message.chat.id, "<b>Nenhum anime / mangá foi encontrado!\nTente ser um pouco mais especifico</b>", {
          parse_mode: "HTML",
          reply_to_message_id: message.message_id
        })
      }

    } catch (err) {
      console.log(err)
    }

  }

}

module.exports = ChatPrivate;