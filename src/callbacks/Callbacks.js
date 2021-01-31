const animesModel = require("../utils/AnimesUtils")
const text = require("../utils/Texts")
const bot = require('../botSettings')

Array.prototype.splitter = function (size) {
  let indice = 0,
    arr = []
  for (let i = 0; i < this.length; i++) {
    if (!arr[indice]) arr[indice] = []
    arr[indice].push(this[i])
    if (arr[indice].length == size) indice++
  }
  return arr
}


class Callbacks {

  constructor(div) {
    this.div = div;
  }

  async menuAnime(message) {
    const anime = await animesModel.getAnimeById(this.div[1])
    bot.editMessageMedia({
      media: anime.imageUrl,
      type: "photo",
      caption: text.caption(anime),
      parse_mode: "HTML"
    }, {
      chat_id: message.message.chat.id,
      message_id: message.message.message_id,
      reply_markup: {
        inline_keyboard: [
          [{
            text: "Assistir agora",
            callback_data: `watch ${anime.id}`
          }],
          [{
            text: "Notificar novos EPs",
            callback_data: `notification ${anime.id} ${message.from.id}`
          }],
          [{
              text: "Episódios",
              callback_data: `list ${anime.id} 0`
            },
            {
              text: "Dicas",
              callback_data: `issue`
            }
          ],
        ]
      }
    })
  }

  async listAnime(message) {
    const anime = await animesModel.getEpisodes(this.div[1])
    const indice = parseInt(this.div[2])
    const arrayAnimes = anime.splitter(5)
    const tempSize = arrayAnimes.length 

    let arrButtons = []

    arrayAnimes[indice].forEach(item => {
      arrButtons.push([{
        text: `Episódio ${item.id}`,
        callback_data: `view episodesHD ${item.animeId} ${item.id-1}`
      }])
    })
      
    arrButtons.push([
      {
        text: indice == 0 ? '🔙 Menu' : `🔙`,
        callback_data: indice == 0 ? `menu ${anime[0].id}` : `list ${anime[0].id} ${indice-1}`
      },
      {
        text: `${indice+1} / ${tempSize}`,
        callback_data: 'enfeite'
      },
      {
        text: indice+1 >= tempSize ? '✖️': '🔜',
        callback_data: indice+1 >= tempSize ? 'fim': `list ${anime[0].id} ${indice+1}`        
      }
    ])

    bot.editMessageCaption(
      `Aqui está a lista de episódios para ${anime[0].name}`, {
        chat_id: message.message.chat.id,
        message_id: message.message.message_id,
        reply_markup: {
          inline_keyboard: arrButtons
        }
      }
    )

  }

  async watchAnime(message) {

    bot.editMessageCaption(`Selecione a resolução que deseja: `, {
      chat_id: message.message.chat.id,
      message_id: message.message.message_id,
      reply_markup: {
        inline_keyboard: [
          [{
              text: "SD - 480p",
              callback_data: `view episodesSD ${this.div[1]} 0`
            },
            {
              text: "HD - 720p",
              callback_data: `view episodesHD ${this.div[1]} 0`
            }
          ],
          [{
            text: "Full HD - 1080p",
            callback_data: `view episodesFHD ${this.div[1]} 0`
          }, {
            text: "🔙 MENU",
            callback_data: "menu " + this.div[1]
          }]
        ]
      }
    })

  }

  async viewAnime(message) {
    const anime = await animesModel.getEpisodes(this.div[2], this.div[1])
    const indice = parseInt(this.div[3])
    const countNewEp = indice + 1
    const tempSize = anime.length
    console.log(anime[indice].file_id)
    if (indice >= 0 && indice != tempSize) {
      const countEp = `(${indice+1}/${tempSize})`
      bot.editMessageMedia({
        media: anime[indice].file_id,
        type: 'video',
        caption: `<b>Anime</b>: <i>${anime[0].name}</i>\nEpisódio: ${countEp}`,
        parse_mode: 'HTML'
      }, {
        chat_id: message.message.chat.id,
        message_id: message.message.message_id,
        reply_markup: {
          inline_keyboard: [
            [{
              text: '🔙',
              callback_data: `back ${this.div[1]} ${anime[0].id} ${indice-1}`
            }, {
              text: '🔜',
              callback_data: `continue ${this.div[1]} ${anime[0].id} ${indice+1}`
            }],
            [{
              text: '🔙 MENU',
              callback_data: `menu ${anime[0].id}`
            }]
          ]
        }
      })

    } else if (countNewEp > tempSize) {
      this.bot.editMessageMedia({
        media: 'https://i.pinimg.com/originals/50/20/02/502002bb2f5f8993446cf8cfee1b1467.jpg',
        type: 'photo',
        caption: '<b> Opa, parece que não há mais episódios para este anime para este</b>',
        parse_mode: 'HTML'
      }, {
        chat_id: message.message.chat.id,
        message_id: message.message.message_id,
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Notificar novos episódios',
              callback_data: `notification ${anime[0].id} ${message.from.id}`
            }, {
              text: 'Voltar ao menu',
              callback_data: `menu ${anime[0].id}`
            }],
            [{
              text: 'Novidades sobre o bot',
              url: 'https://middleware.com'
            }],
          ]
        }
      })
    } else if (indice == -1) {
      this.bot.editMessageMedia({
        media: anime[0].imageUrl,
        type: "photo",
        caption: `<b>Selecione a resolução que deseja assistir</b>: `,
        parse_mode: "HTML"
      }, {
        chat_id: message.message.chat.id,
        message_id: message.message.message_id,
        reply_markup: {
          inline_keyboard: [
            [{
                text: "SD - 480p",
                callback_data: `view episodesSD ${anime[0].id} 0`
              },
              {
                text: "HD - 720p",
                callback_data: `view episodesHD ${anime[0].id} 0`
              }
            ],
            [{
              text: "Full HD - 1080p",
              callback_data: `view episodesFHD ${anime[0].id} 0`
            }],
            [{
              text: "🔙 MENU",
              callback_data: `menu ${anime[0].id}`
            }]
          ]
        }
      })
    }

  }


}

module.exports = Callbacks;
