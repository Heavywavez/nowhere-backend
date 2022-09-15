const { Schema, model } = require('mongoose');

const coworkSchema = new Schema(
    {
      coworkId: {
          type: Schema.Types.ObjectId,
          ref: 'Cowork'
      },
      customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
      },
      totalCost: Number,
      createdBy: String,
      updatedBy: String,
      startDate: Date,
      endDate: Date,
      isActive: Boolean,
      type: {
        type: String,
        default: "Cowork",
      }
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  module.exports = model('CoworkRegister', coworkSchema);