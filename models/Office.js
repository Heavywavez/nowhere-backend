const { Schema, model } = require('mongoose');

const officeSchema = new Schema(
    {
      nameOffice: String,
      size: Number,
      startDate: Date,
      endDate: Date, 
      userName: String,
      unitCost: Number,
      totalCost: Number,
      createdBy: String,
      updatedBy: String,
      extraHour: Number
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  module.exports = model('Office', officeSchema);