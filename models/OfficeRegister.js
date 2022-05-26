const { Schema, model } = require('mongoose');

const officeSchema = new Schema(
    {
      officeId: {
          type: Schema.Types.ObjectId,
          ref: 'Office'
      },
      userName: String,
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
  
  module.exports = model('Office', officeSchema);