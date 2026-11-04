const { Schema, model, Types } = require("mongoose");
const { CollectionNames } = require("../../utils/constants");
const BlogScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: CollectionNames.USERS,
      required: true,
    },

    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "published",
    },
  },
  { timestamps: true, version: false }
);

const BlogModel = model(
  CollectionNames.BLOGS,
  BlogScheme,
  CollectionNames.BLOGS
);
module.exports = BlogModel;
