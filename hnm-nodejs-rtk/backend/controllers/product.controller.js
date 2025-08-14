const Product = require("../models/Product");
const PAGE_SIZE = 5;

const productController = {};

productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      size,
      name,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;

    console.log(req.body);

    if (
      !sku ||
      !name ||
      !image ||
      !category ||
      !description ||
      !price ||
      !stock ||
      !status
    ) {
      return res
        .status(400)
        .json({ status: "failed", error: "Please enter all values" });
    }

    await Product.findOne({ sku: sku }).then((product) => {
      if (product) {
        return res
          .status(400)
          .json({ status: "failed", error: "SKU already exists" });
      }
    });

    const product = new Product({
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    });

    await product.save();
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

productController.getProducts = async (req, res) => {
  try {
    const { page, name } = req.query;
    const cond = name
      ? { name: { $regex: name, $options: "i" }, isDeleted: false }
      : { isDeleted: false };
    let query = Product.find(cond);
    let response = { status: "success" };

    if (page) {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      // 데이터가 총 몇개있는지
      const totalItemNumber = await Product.countDocuments(cond);
      // 페이지가 총 몇개있는지
      const totalPageNum = Math.ceil(totalItemNumber / PAGE_SIZE);

      response.totalItemNum = totalItemNumber;
      response.totalPageNum = totalPageNum;
    }

    const productList = await query.exec();
    response.data = productList;

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

productController.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(400)
        .json({ status: "failed", error: "item does not exist" });
    }

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

productController.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const reqBody = req.body;

    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      { ...reqBody },
      { new: true }
    );

    if (!product) {
      return res
        .status(400)
        .json({ status: "failed", error: "item does not exist" });
    }

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

productController.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete({ _id: productId });

    if (!product) {
      return res
        .status(400)
        .json({ status: "failed", error: "item does not exist" });
    }

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

productController.checkStock = async (item) => {
  const product = await Product.findById(item.productId);

  if (product.stock[item.size] < item.qty) {
    return {
      isVerify: false,
      message: `${product.name}의 ${item.size}재고가 부족합니다`,
    };
  }

  const newStock = { ...product.stock };
  newStock[item.size] -= item.qty;
  product.stock = newStock;
  await product.save();

  return { isVerify: true };
};

productController.checkItemListStock = async (itemList) => {
  const insufficientStockItems = [];

  await Promise.all(
    itemList.map(async (item) => {
      const stockCheck = await productController.checkStock(item);
      if (!stockCheck.isVerify) {
        insufficientStockItems.push({
          item,
          message: stockCheck.message,
        });
      }

      return stockCheck;
    })
  );

  return insufficientStockItems;
};

module.exports = productController;
