const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: "User" },
    items: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

CartSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.createAt;
  return obj;
};

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
