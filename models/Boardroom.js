const { Schema, model } = require('mongoose');

const boardroomSchema = new Schema(
    {
      nameBoardroom: String,
      size: Number,
      startDate: Date,
      endDate: Date, 
      userName: String,
      unitCost: Number,
      totalCost: Number,
      createdBy: String,
      updatedBy: String,
      typeUser: {
        type: String,
        enum: ["Internal", "External"],
        default: "External",
        required: true
      },
     extraHour: Number
     
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  module.exports = model('Boardroom', boardroomSchema);