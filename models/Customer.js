const { Schema, model } = require('mongoose');

const customerSchema = new Schema(
  {
    email: String,
    name: {
      type: String,
      minlength: 2
    },
    lastName: String,
    familyName: String,
    phoneNumber: String,
    rentType: String,
    isActive: {
        type: Boolean,
        default: false,
    },
    createdBy: String,
    updatedBy: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);


module.exports = model('Customer', customerSchema);
