const Cart = require("../models/Cart");
const cartController = {};

cartController.addItemToCart = async (req, res) => {
  try {
    const { userId } = req;
    const { productId, size, qty } = req.body;
    let cart = await Cart.findOne({ userId });

    // userId가 없으면 카트 생성
    if (!cart) {
      cart = new Cart({ userId });
      await cart.save();
    }

    // 이미 카트에 있는 상품인지 확인
    const existingItem = cart.items.find(
      (item) => item.productId.equals(productId) && item.size === size
    );

    if (existingItem) {
      throw new Error("이미 카트에 있는 상품입니다.");
    }

    cart.items = [...cart.items, { productId, size, qty }];
    await cart.save();

    res.status(200).json({
      status: "success",
      data: cart,
      cartItemQty: cart.items.length,
    });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

cartController.getCartList = async (req, res) => {
  try {
    const { userId } = req;
    const carts = await Cart.findOne({ userId }).populate({
      path: "items",
      populate: {
        path: "productId",
        model: "Product",
      },
    });

    res.status(200).json({ status: "success", data: carts.items });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

cartController.getCartQty = async (req, res) => {
  try {
    const { userId } = req;
    const cart = await Cart.findOne({ userId });

    res.status(200).json({ status: "success", data: cart.items.length });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

cartController.deleteCartItem = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error("카트에서 삭제할 상품이 없습니다.");
    }

    const newItems = cart.items.filter((item) => !item._id.equals(id));
    cart.items = [...newItems];

    await cart.save();

    res.status(200).json({ status: "success", data: cart.items });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

module.exports = cartController;
