const { Schema, model } = require('mongoose');

const officeSchema = new Schema(
    {
      nameOffice: String,
      size: Number,
      userName: String,
      hourCost: Number,
      monthCost: Number,
      createdBy: String,
      updatedBy: String,
      extraHourCost: Number
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  module.exports = model('Office', officeSchema);