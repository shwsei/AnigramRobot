const model = require("../schema/index");

class ChatPrivate{
  constructor(bot){
    this.bot = bot;
  }

  async chatPrivateAnime(ctx){

    try{
      const query = await model.find({name: ctx.text});
      if(query != ""){
        let arrAnime = []
        query.forEach((anime)=>{
          arrAnime.push([
            {
              text: anime.name,
              callback_data: `menu ${anime._id}`
            }
          ])
        })
  
        this.bot.sendPhoto(ctx.chat.id,"https://casalotaku.files.wordpress.com/2013/03/311.jpg",{
          caption: "<b>Hum, encontrei estes animes!</b>",
          parse_mode: "HTML",
          reply_to_message_id: ctx.message_id,
          reply_markup: {
            inline_keyboard: arrAnime
          }
        })
  
      }else{
        this.bot.sendMessage(ctx.chat.id,"<b>Nenhum anime / mangá foi encontrado!\nTente ser um pouco mais especifico</b>",{
          parse_mode: "HTML",
          reply_to_message_id: ctx.message_id
        })
      }
    } catch(err){
      console.log(err)

      this.bot.sendMessage(ctx.chat.id,"<b>Nenhum anime / mangá foi encontrado!</b>",{
        parse_mode: "HTML",
        reply_to_message_id: ctx.message_id
      })

    }

  }


}

module.exports = ChatPrivate;