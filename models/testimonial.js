
const mongoose = require('mongoose')

const TestimonialSchema = new mongoose.Schema({
      photo: {
            type: String
      },
      name: {
            type: String,
            required: true
      },
      post: {
            type: String,
            required: true
      },
      description: {
            type: String,
            required: true
      },
      active: {
            type: Number,
            default: 1,
      },

},{
      timestamps: true
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);