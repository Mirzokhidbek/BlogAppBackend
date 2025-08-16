const { Schema, model } = require("mongoose");
const { CollectionNames } = require("../../utils/constants");
const userScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true, version: false }
);

const UserModel = model(
  CollectionNames.USERS,
  userScheme,
  CollectionNames.USERS
);
module.exports = UserModel;
