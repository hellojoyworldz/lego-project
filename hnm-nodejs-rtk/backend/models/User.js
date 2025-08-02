const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// level type: customer, admin
const UserLevelTypeEnum = {
  CUSTOMER: "customer",
  ADMIN: "admin",
};

const userSchema = Schema(
  {
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: Object.values(UserLevelTypeEnum),
      default: "customer",
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.createAt;
  return obj;
};

const User = mongoose.model("User", userSchema);

module.exports = { User, UserLevelTypeEnum };
