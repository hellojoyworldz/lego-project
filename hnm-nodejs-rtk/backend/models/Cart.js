const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.ObjectId, ref: "Product", required: true },
        size: { type: String, required: true },
        qty: { type: Number, required: true, default: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

CartSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.createAt;
  return obj;
};

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
