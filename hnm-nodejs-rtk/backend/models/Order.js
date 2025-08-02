const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = Schema(
  {
    orderId: { type: Number, required: true, unique: true },
    userId: { type: mongoose.ObjectId, ref: "User", required: true },
    shipTo: { type: Object, required: true },
    contact: { type: Object, required: true },
    totalPrice: { type: Number, required: true, default: 0 },
    status: { type: String, default: "pending", required: true },
    items: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

OrderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.createAt;
  return obj;
};

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
