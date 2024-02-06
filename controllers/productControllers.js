import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModels.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    //validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !brand:
        return res.status(400).json("Brand is Required");
      case !price:
        return res.status(400).json("Price is Required");
      case !category:
        return res.status(400).json("Category is required");
      case !quantity:
        return res
          .status(400)
          .json("Quantity must be a number greater than zero");
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.json({
      product,
    });
  } catch (error) {
    console.log("Error in adding product : ", error);
    res.status(401).json({ message: "Something went wrong!" });
  }
});

//update product
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    //validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !brand:
        return res.status(400).json("Brand is Required");
      case !price:
        return res.status(400).json("Price is Required");
      case !category:
        return res.status(400).json("Category is required");
      case !quantity:
        return res
          .status(400)
          .json("Quantity must be a number greater than zero");
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

const fetchProduct = asyncHandler(async (req, res) => {
    try {
      const pageSize = 6;
      const keyword = req.query.keyword
        ? { name: { $regex: req.query.keyword, $options: "i" } }
        : {};
  
      const count = await Product.countDocuments(keyword);
      const products = await Product.find(keyword).limit(pageSize);
      
      res.json({
        products,
        page: 1,
        pages: Math.ceil(count / pageSize),
        hasMore: false,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!"});
    }
});
  

export { addProduct, updateProduct, removeProduct, fetchProduct };
