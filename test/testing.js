const animes = require("../src/schema/index.js");

//Ep1 - BAACAgQAAxkBAALnNV_g1rpGFpymh2ffe_3TfMLM2JoLAAJvAwACK395UiIhaLdH6V9YHgQ
//Ep2 - BAACAgQAAxkBAALnNl_g1rpS2GLhJIllsKYVwa5B4G8qAAIuBAACnvDJUp5zaiSarn2lHgQ
//Ep3 - BAACAgQAAxkBAALnN1_g1rq4LRGfQBIiTJW89JZTuJsGAAKiAgACTUUZU5FMf1gdWOIDHgQ
const json = {
  resolutions:{
    sd: [
    ],
    hd: [
      "BAACAgQAAxkBAALnjV_iO2KVRIROMFvEwNaGbCiq4PNJAAKKBgACPHYhUV50QYfws0CiHgQ",
      "BAACAgQAAxkBAALni1_iO2IdyT0SUnCQvaisNEJk6JL9AAKJBQACqUdpUVMBYwZAgijtHgQ",
      "BAACAgQAAxkBAALnN1_g1rq4LRGfQBIiTJW89JZTuJsGAAKiAgACTUUZU5FMf1gdWOIDHgQ",
      "BAACAgQAAxkBAALnhV_iO2LXhs7_q8coV6YCIg7aX_CNAAIgBQAC4lvRUN5313cs1WS8HgQ",
      "BAACAgQAAxkBAALniF_iO2In12yxL_H76nxdulxdH4nZAAIlBQACaLwhUdJjbeMwuHWiHgQ",
      "BAACAgQAAxkBAALng1_iO2IYIAR393_qMlThQMuXP8O0AAL6BQACfpj4U_hAmNGAShKXHgQ",
      "BAACAgQAAxkBAALngV_iO2KyI3L9gC02OsRzFJK-jKHgAAJvAwACZXqwUzgFC9INPfHDHgQ",
      "BAACAgQAAxkBAALnf1_iO2J-XPIvZYY9CkZEHKjn_auqAAJyAwACcoZgU0LCNTUPrr8pHgQ"
    ],
    fhd: [
      
    ]
  }
}




// name: String,
// description: String,
// genre: String,
// eps: Array,
// image: String,
// mal: String,
// idMal: String,
// type: String,
// year: String,


const a = async()=>{
  await new animes({
    name: "Steins;Gate 0",
    description: "A obscura história não contada de Steins, Gate, que leva com o excêntrico cientista louco Okabe, lutando para se recuperar de uma tentativa fracassada de resgatar Kurisu. Ele decide desistir e abandona seu animado cientista alter ego, em busca de esquecer o passado.",
    genre: " Aventura, Comédia, Drama, Mistério, Sci-fi",
    eps: json,
    image: "https://www.gematsu.com/wp-content/uploads/2015/09/Steins-Gate-0-Package-Illust_09-15-15_Site-Ver.jpg",
    mal: "https://myanimelist.net/anime/30484/Steins_Gate_0",
    type: "tv",
    year: "2018",
    idMal: "30484"
  }).save()
}

a()