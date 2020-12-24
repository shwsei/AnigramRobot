const model = require("../schema/index");
const text = require("./Texts")

module.exports = (bot) => async (ctx) => {
  const msg = ctx.text;
  if (msg.includes(' ')) {
    const anime = await model.findById(msg.split(' ')[1])
    bot.sendPhoto(
      ctx.chat.id,
      anime.image, {
      caption: text.caption(anime),
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Assistir agora",
              callback_data: "watch " + anime._id
            }
          ],
          [{
            text: "Notificar novos EPs",
            callback_data: "notification"
          }
          ],
          [
            {
              text: "Episódios",
              callback_data: "list " + anime._id + " 0 5 0"
            },
            {
              text: "Dicas",
              callback_data: "issue " + anime._id
            }
          ],
        ]
      }
    }
    )
  }

}