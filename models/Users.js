import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    EmailAddress: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    Mobile: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Mobile number should be exactly 10 digits"],
    },
    Password: {
      type: String,
      required: true,
      minlength: [8, "Password should be at least 8 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("Users", UserSchema);
export default User;
