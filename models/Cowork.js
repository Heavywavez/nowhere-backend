const { Schema, model } = require('mongoose');

const CoworkSchema = new Schema(
    {
      nameRoom: String,
      size: Number,
      currentUsers: String,
      lastDateReserver: Date, 
      createdBy: String,
      updatedBy: String,
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  module.exports = model('Cowork', coworkSchema);