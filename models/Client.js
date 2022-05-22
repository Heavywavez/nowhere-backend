const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
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