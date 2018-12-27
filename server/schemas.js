const mongoose = require('mongoose');

const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

// this will be our data base's data structure
const NoteSchema = new Schema(
  {
    id: String,
    userId: String,
    title: String,
    text: String,
  },
  { timestamps: true },
);

const UserSchema = new Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true },
);
UserSchema.plugin(passportLocalMongoose);


// export the new Schema so we could modify it using Node.js
module.exports = {
  Note: mongoose.model('Note', NoteSchema),
  User: mongoose.model('User', UserSchema),
};
