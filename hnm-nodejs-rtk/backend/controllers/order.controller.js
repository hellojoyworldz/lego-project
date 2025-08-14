const Order = require("../models/Order");
const productController = require("./product.controller");
const randomStringGenerator = require("../utils/randomStringGenerator");
const orderController = {};
const PAGE_SIZE = 5;

orderController.createOrder = async (req, res) => {
  try {
    const { userId } = req;
    const { shipTo, contact, totalPrice, orderList } = req.body;

    // 재고확인,업데이트
    const insufficientStockItems = await productController.checkItemListStock(
      orderList
    );

    if (insufficientStockItems.length > 0) {
      const errorMessage = insufficientStockItems.map((item) => {
        return {
          message: item.message,
        };
      });

      res.status(400).json({ status: "failed", error: errorMessage });
      return;
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

orderController.getOrder = async (req, res) => {
  try {
    const { userId } = req;
    const orderList = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json({ status: "success", data: orderList });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

orderController.getOrderList = async (req, res) => {
  try {
    const { page, ordernum } = req.query;
    console.log(req.body);

    const cond = ordernum
      ? {
          $expr: {
            $regexMatch: {
              input: { $toString: "$orderNum" },
              regex: ordernum,
            },
          },
        }
      : {};
    let query = Order.find(cond)
      .populate("items.productId")
      .sort({ createdAt: -1 });
    let response = { status: "success" };

    if (page) {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      const totalItemNumber = await Order.countDocuments(cond);
      const totalPageNum = Math.ceil(totalItemNumber / PAGE_SIZE);

      response.totalItemNum = totalItemNumber;
      response.totalPageNum = totalPageNum;
    }

    const orderList = await query.exec();
    response.data = orderList;
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

orderController.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};
module.exports = orderController;
