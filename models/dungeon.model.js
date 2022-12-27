const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dungeonSchema = new Schema({
  content: {
    type: String
  }
}, {
    collection: 'dungeons'
})

module.exports = mongoose.model('Dungeon', dungeonSchema)