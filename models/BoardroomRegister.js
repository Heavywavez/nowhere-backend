const { Schema, model } = require('mongoose');

const boardroomSchema = new Schema(
    {
      boardroomId: {
          type: Schema.Types.ObjectId,
          ref: 'Boardroom'
      },
      userName: String,
      totalCost: Number,
      createdBy: String,
      updatedBy: String,
      extraBoardRoomHour: Number,
      startDate: Date,
      endDate: Date
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  module.exports = model('Boardroom', boardroomSchema);