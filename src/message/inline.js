const animesModel = require('../utils/AnimesUtils')
const text = require('../utils/Texts')
const bot = require('../botSettings')

module.exports = async message => {

  const searchResult = await animesModel.getAnimeByName(message.query);
  
  const result = searchResult ? searchResult.map((anime, id)=>({
    id: id,
    title: anime.name,
    type: 'article',
    description: anime.description,
    thumb_url: anime.imageUrl,
    input_message_content: {
      message_text: text.createText(anime),
      parse_mode: 'HTML'
    },reply_markup:{
      inline_keyboard: [
        [{
          text: 'Ver anime',
          url: `https://t.me/${process.env.USER_BOT}?start=${anime.id}`
        }]
      ]
    }
  })) : [];

  bot.answerInlineQuery(call.chat.id, result)

}