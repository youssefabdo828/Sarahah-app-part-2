import { set } from "mongoose";
import mongoose from "mongoose";
import { genderEnum } from "../../common/enum/user.enum.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [    3, "First name must be at least 3 characters long"],
    maxlength: [   50, "First name must be at most 50 characters long"],
    lowercase: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    minlength: [    3, "Last name must be at least 3 characters long"],
    maxlength: [   50, "Last name must be at most 50 characters long"],
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    index: {name: "email_index_unique", unique: true},
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: Object.values(genderEnum),
    default: genderEnum.Male
  },
  age: {
    type: Number,
    min: [18, "Age must be at least 18"],
    max: [100, "Age must be at most 100"],
    required: true
  },
profilepicture: String,

phoneNumber : String
},{
    virtuals: {
        fullName: {
            get: function() {
                return `${this.firstName} __ ${this.lastName}`;
            }
        }

    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});




const User = mongoose.model("User", userSchema);

export default User;