const { Schema, model } = require('mongoose');

const boardroomSchema = new Schema(
    {
      boardroomId: {
          type: Schema.Types.ObjectId,
          ref: 'Boardroom'
      },
      userName: String,
      userType: String,
      totalCost: Number,
      createdBy: String,
      updatedBy: String,
      startDate: Date,
      endDate: Date
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  module.exports = model('BoardroomRegister', boardroomSchema);