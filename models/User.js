const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    email: String,
    name: {
      type: String,
      minlength: 2
    },
    lastName: String,
    familyName: String,
    role: {
      type: String,
      enum: ["Admin", "Worker", "Client"],
      default: "Worker",
      required: true
    },
    phoneNumber: String,
    createdBy: String,
    updatedBy: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);
