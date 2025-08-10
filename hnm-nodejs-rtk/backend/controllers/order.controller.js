const Order = require("../models/Order");
const productController = require("./product.controller");
const randomStringGenerator = require("../utils/randomStringGenerator");
const orderController = {};

orderController.createOrder = async (req, res) => {
  try {
    const { userId } = req;
    const { shipTo, contact, totalPrice, orderList } = req.body;

    // 재고확인,업데이트
    const insufficientStockItems = await productController.checkItemListStock(
      orderList
    );

    if (insufficientStockItems.length > 0) {
      const errorMessage = insufficientStockItems.reduce((total, item) => {
        total += item.message;
        return total;
      }, "");

      throw new Error(errorMessage);
    }

    // 주문
    const newOrder = new Order({
      userId,
      totalPrice,
      shipTo,
      contact,
      items: orderList,
      orderNum: Number(randomStringGenerator()),
    });

    await newOrder.save();

    res.status(200).json({ status: "success", orderNum: newOrder.orderNum });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

module.exports = orderController;
