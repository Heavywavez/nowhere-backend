const { Schema, model } = require('mongoose');

const clientSchema = new Schema(
    {
      name: String,
      lastName: String,
      familyName: String, 
      phoneNumber: String,
      email: String, 
      rfc: String,
      fiscalAddress: String
    },
    {
      timestamps: true,
      versionKey: false
    }
);

module.exports = model('Client', clientSchema);