
const mongoose = require('mongoose')

const waitListSchema = new mongoose.Schema({
      full_name: {
            type: String,
            required: true
      },
      whatsapp: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true
      },
      completed_year: {
            type: Number,
      },
      own_laptop: {
            type: Boolean,
      },
      type: {
            type: String,
      },

},{
      timestamps: true
});

module.exports = mongoose.model('waitList', waitListSchema);