
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
      completedYear: {
            type: Number,
      },
      ownLaptop: {
            type: Boolean,
      },
      type: {
            type: String,
      },
      totalExperience: {
            type: String,
      },
      MasterIn: {
            type: String,
      },

},{
      timestamps: true
});

module.exports = mongoose.model('waitList', waitListSchema);