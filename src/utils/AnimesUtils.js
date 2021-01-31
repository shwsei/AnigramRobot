const knexFile = require('../../knexfile')
const knex = require('knex')(knexFile.development)

class AnimesUtils {

  /**
   * Returns Object with anime data.
   *
   * @param {String} Name (string) of the anime to be fetched.
   *
   * @return {Object} x Object with anime data.
   */
  async getAnimeByName(name) {
    try {
      const data = await knex('animes').where('name', 'like', `%${name}%`)
      return data
    } catch (err) {

      throw new Error(err)
    }

  }

  /**
   * Returns Object with anime data.
   *
   * @param {number} id The integer that represents the anime ID in the table.
   *
   * @return {Object} x Object with anime data.
   */
  async getAnimeById(id) {
    try {

      const data = await knex('animes').where('id', parseInt(id))
      return data[0]

    } catch (err) {

      throw new Error(err)
    }

  }


  /**
   * Returns Object with status and message.
   *
   * @param {Object} episode json with date of anime.
   * @param {String} episode.file_id file_id of Telegram of mp4.
   * @param {Number} episode.animeId id of anime.
   * @param {String} resolution resolution of anime, episodesHD, episodesSD or episodesFHD.
   * @return {Object} x Object with status and msg.
   */
  async addEpsisode(episode, resolution = 'episodesHD') {
    try {
      const searchAnime = await knex('animes').where('id', episode.animeId)

      if (searchAnime.length == 1) {
        
        const addingEpisode = await knex.insert({
          file_id: episode.file_id,
          animeId: episode.animeId
        }).table(resolution)
        return {
          status: true,
          msg: "Episódio do anime foi adicionado com sucesso!"
        }

      } else {

        return {
          status: false,
          msg: "Anime não foi encontrado"
        }

      }

    } catch (err) {
      throw new Error(err)
    }
  }
  

  /**
   * Returns Array with episodes of anime.
   * @param {Number} id id of anime to get episodes.
   * @param {String} type resolution of anime, default episodesHD
   * @return {Array} x Array with episodes of anime.
   */
  async getEpisodes(id, type = 'episodesHD') {
    try {
      const data = await knex('animes')
        .join(type, 'animes.id', '=', parseInt(id))

      if (data.length == 0) {
        return {
          status: false,
          msg: "O anime não possui nenhum episódio"
        }
      } else {
        return data

      }

    } catch (err) {
      throw new Error(err)
    }
  }
  
}



module.exports = new AnimesUtils()
