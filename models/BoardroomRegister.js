const { Schema, model } = require('mongoose');

const boardroomSchema = new Schema(
    {
      boardroomId: {
          type: Schema.Types.ObjectId,
          ref: 'Boardroom'
      },
      customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
      },
      userType: String,
      totalCost: Number,
      createdBy: String,
      updatedBy: String,
      startDate: Date,
      dateReserved: Date,
      endDate: Date,
      type: {
        type: String,
        default: "Sala de Juntas",
      }
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  module.exports = model('BoardroomRegister', boardroomSchema);