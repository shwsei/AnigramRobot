class Text{
  
  createText(anime){
    return `
<b>Nome</b>: <i>${anime.name}</i>
<b>Gêneros</b>: <i>${anime.genre}</i>
  
<a href="${anime.mal}"><i>Mais informações</i></a>
`
  
  }
  
  caption(anime){
    return `
<b>${anime.name}</b>  
  
<b>Tipo</b>: <i>${anime.type}</i>
<b>Gênero</b>: <i>${anime.genre}</i>
  
<b>Sinopse</b>: <i>${anime.description}</i>
  
<b>Episódios</b>: <i>${anime.eps.length}</i>
  
  `
  }

}

module.exports = new Text();