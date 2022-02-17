const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
        match: [
            /.+@.+\..+/,
          "Enter a valid email",
        ],
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  
  userSchema.virtual('commentCount').get(function () {
    return this.friends.length;
  });
  
const User = model("User", userSchema);
  
module.exports = User;