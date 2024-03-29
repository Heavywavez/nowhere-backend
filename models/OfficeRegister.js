const { Schema, model } = require('mongoose');

const officeSchema = new Schema(
    {
      officeId: {
          type: Schema.Types.ObjectId,
          ref: 'Office'
      },
      customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
      },
      rentType: String,
      totalCost: Number,
      createdBy: String,
      updatedBy: String,
      startDate: Date,
      endDate: Date,
      datesReserved: [String],
      type: {
        type: String,
        default: "Oficinas",
      }
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  module.exports = model('OfficeRegister', officeSchema);