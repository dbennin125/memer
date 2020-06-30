const chance = require('chance').Chance();
const Meme = require('../lib/models/Meme');

module.exports = async({ memes = 20 } = {}) => {
  await Meme.create([...Array(memes)].map(() => ({
    top: chance.name(),
    image: chance.url(),
    bottom: chance.profession(),
  })));
};
