const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
      role_id:{
            type: Number,
            required: true,
      },
      role_name: {
            type: String,
            required: true,
      },
      role_slug: {
            type: String,
            required: true,
      },
      status:{
            type: Boolean,
            default: true
      },
      created_at: {
            type: Date,
            default: Date.now
      }
});

module.exports = mongoose.model('Role', RoleSchema);