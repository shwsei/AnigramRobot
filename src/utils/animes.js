const model = require("../schema/index");



// name: String,
// description: String,
// genre: String,
// eps: Array,
// image: String,
// mal: String,
// idMal: String,
// type: String,
// year: String,

class Animes{

	async searchAnime(name){
		const query = await model.find({name: {$regex: '.*'+name+".*"}});
		const animes = query != "" ? query : false
		return animes
	}

	async createAnime(name,description,genre,image,eps,mal,idMal,type){
		try{

			const search = this.searchAnime(name)
			
			if(search){

				const query = await new model({
					name,
					description,
					genre,
					image,
					eps: [eps],
					mal,
					idMal,
					type
				}).save();

				return true;
			
			}else{

				return false
			}
		}catch(e){
			
			return false;
		
		}
	}

}


module.exports = new Animes();