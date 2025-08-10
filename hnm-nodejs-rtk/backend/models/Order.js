const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cart = require("./Cart");

const OrderSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: "User", required: true },
    status: { type: String, default: "pending", required: true },
    totalPrice: { type: Number, required: true, default: 0 },
    shipTo: { type: Object, required: true },
    contact: { type: Object, required: true },
    orderNum: { type: Number, required: true, unique: true },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        size: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

OrderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.createAt;
  return obj;
};

OrderSchema.post("save", async function () {
  const cart = await Cart.findOne({ userId: this.userId });
  cart.items = [];
  await cart.save();
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
