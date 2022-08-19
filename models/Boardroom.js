const { Schema, model } = require('mongoose');

const boardroomSchema = new Schema(
    {
      nameBoardroom: String,
      size: Number,
      hourCostExt: Number,
      hourCostInt: Number,
      fiveHourCostExt: Number,
      fiveHourCostInt: Number,
      tenHourCostExt: Number,
      tenHourCostInt: Number,
      createdBy: String,
      updatedBy: String,     
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  module.exports = model('Boardroom', boardroomSchema);