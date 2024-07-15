import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (value) {
        // Custom validation logic
        return value.endsWith('iitdh.ac.in');
      },
      message: 'Email must have the suffix "iitdh.ac.in"',
    },
  },
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  },
  book1: {
    type: String,
    default: "",
    required: false
  },
  book2: {
    type: String,
    default: "",
    required: false
  },
  book3: {
    type: String,
    default: "",
    required: false
  },
  book1Date: {
    type: String,
    default: "",
    required: false
  },
  book2Date: {
    type: String,
    default: "",
    required: false
  },
  book3Date: {
    type: String,
    default: "",
    required: false
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;
