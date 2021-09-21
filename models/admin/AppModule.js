const mongoose = require('mongoose');

const AppModuleSchema = new mongoose.Schema({
      module_name: {
            type: String,
            required: true,
      },
      module_icon:{
            type: String,
            default: 'fa fa-gear'
      },
      module_slug:{
            type: String
      },
      module_type:{
            type: String
      },
      module_sequence:{
            type: Number
      },
      status:{
            type: Boolean,
            default: true
      },
      create_at: {
            type: Date,
            default: Date.now
      }
});

module.exports = mongoose.model('AppModule', AppModuleSchema);