const mongoose = require('mongoose');

const RolePermissionSchema = new mongoose.Schema({
      email: {
            type: String,
      },
      role_id:{
            type: Number,
            required: true,
      },
      role_slug: {
            type: String,
            required: true,
      },
      role_name: {
            type: String,
      },
      module_id: {
            type: String,
      },
      module_name: {
            type: String,
      },
      module_slug: {
            type: String,
      },
      module_icon: {
            type: String,
      },
      method_name: {
            type: String,
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

module.exports = mongoose.model('RolePermission', RolePermissionSchema);