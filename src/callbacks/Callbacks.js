const model = require("../schema/index");
const text = require("../utils/Texts");

class Callbacks{
  constructor(bot, div){
    this.bot = bot;
    this.div = div;
  }

  async listAnime(ctx){
    const anime = await model.findById(this.div[1]);

    let json = [];
    const eps = anime.eps.resolutions.hd;
    const arr = eps.slice(this.div[2], this.div[3]);
    let numberEp = parseInt(this.div[4])

    arr.forEach(ep => {
      numberEp++;
      let indiceEp = numberEp-1;

      json.push([
        {
          text: `Episódio: ${numberEp}`,
          callback_data: `view hd ${anime.idMal} ${indiceEp}`
        }
      ])


    });

    json.push([
      {
        text: "🔙 MENU",
        callback_data: `menu ${anime._id}`
      },
      {
        text: "🔜",
        callback_data: `list ${anime._id} ${parseInt(this.div[2])+5} ${parseInt(this.div[3])+5} ${numberEp}`  
      }
    ])

    this.bot.editMessageCaption(
      `Aqui está a lista de episódios para ${anime.name}`,
      {
        chat_id: ctx.message.chat.id,
        message_id: ctx.message.message_id,
        reply_markup: {
          inline_keyboard: json
        }
      }
    )


  }
  
  async watchAnime(ctx){
    const anime = await model.findById(this.div[1])

    this.bot.editMessageCaption(`Selecione a resolução que deseja: `,
      {
        chat_id: ctx.message.chat.id,
        message_id: ctx.message.message_id,
        reply_markup: {
          inline_keyboard:[
            [{
              text: "SD - 480p",
              callback_data: `view sd ${anime.idMal} 0`
            },
            {
              text: "HD - 720p",
              callback_data: `view hd ${anime.idMal} 0`
            }],
            [{
              text: "Full HD - 1080p",
              callback_data: `view fhd ${anime.idMal} 0`
            },{
              text: "🔙 MENU",
              callback_data: "menu "+anime._id
            }]
          ]
        }
      }
    )
        
  }

  async menuAnime(ctx){
    const anime = await model.findById(this.div[1])
    this.bot.editMessageMedia(
      { 
        media: anime.image,
        type: "photo",
        caption: text.caption(anime),
        parse_mode: "HTML"  
      },{
        chat_id: ctx.message.chat.id,
        message_id: ctx.message.message_id,
        reply_markup:{
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
  

  async viewAnime(ctx){
    const anime = await model.find({idMal: this.div[2]});

    if(this.div[3] >= 0 && parseInt(this.div[3]) != anime[0].eps.resolutions[this.div[1]].length){
      const countEp = `(${parseInt(this.div[3])+1}/${anime[0].eps.resolutions[this.div[1]].length})`
      this.bot.editMessageMedia({
        media: anime[0].eps.resolutions[this.div[1]][parseInt(this.div[3])],
        type: "video",
        caption: `<b>Anime</b>: <i>${anime[0].name}</i>\nEpisódio: ${countEp}`,
        parse_mode: "HTML"
      },{
        chat_id: ctx.message.chat.id,
        message_id: ctx.message.message_id,
        reply_markup: {
          inline_keyboard:[
            [{
                text: "🔙",
                callback_data: `back ${this.div[1]} ${anime[0].idMal} ${parseInt(this.div[3])-1}`
            },{
              text: "🔜",
              callback_data: `continue ${this.div[1]} ${anime[0].idMal} ${parseInt(this.div[3])+1}`  
            }],[
              {
                text: "🔙 MENU",
                callback_data: "menu "+anime[0]._id
              }
            ]
          ]
        }
      })  
    
    }else{
      this.bot.editMessageMedia({
        media: anime[0].image,
        type: "photo",
        caption: `<b>Selecione a resolução que deseja assistir</b>: `,
        parse_mode: "HTML"
      },{
        chat_id: ctx.message.chat.id,
        message_id: ctx.message.message_Id,
        reply_markup: {
          inline_keyboard:[
            [{
              text: "SD - 480p",
              callback_data: `view sd ${anime.idMal} 0`
            },
            {
              text: "HD - 720p",
              callback_data: `view hd ${anime.idMal} 0`
            }],
            [{
              text: "Full HD - 1080p",
              callback_data: `view fhd ${anime.idMal} 0`
            }],
            [{
              text: "🔙 MENU",
              callback_data: "menu "+anime[0]._id
            }]
          ]
        }
      })
    }
  
  }


}

module.exports = Callbacks;