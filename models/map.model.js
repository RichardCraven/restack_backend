const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mapSchema = new Schema({
  content: {
    type: String
  }
}, {
    collection: 'maps'
})

module.exports = mongoose.model('Map', mapSchema)