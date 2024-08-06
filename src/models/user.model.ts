import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
import { SECRET } from "../utils/env";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        default: "user",
      },
    ],
    profilePicture: {
      type: String,
      default: "default.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware untuk enkripsi password sebelum menyimpan
UserSchema.pre("save", async function (next) {
  const user = this as any;
  if (user.isModified("password")) {
    user.password = encrypt(SECRET, user.password);
  }
  next();
});

// Middleware untuk enkripsi password sebelum melakukan update
UserSchema.pre("findOneAndUpdate", async function (next) {
  const user = this as any;
  if (user._update.password) {
    user._update.password = encrypt(SECRET, user._update.password);
  }
  next();
});

// Menghapus password sebelum mengembalikan objek pengguna sebagai JSON
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
