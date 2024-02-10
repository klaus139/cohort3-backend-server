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

const fetchAllProducts = asyncHandler(async(req, res) => {
  try{
    const products = await Product.find({}).populate('category').limit(12).sort({createdAt: -1})
    res.json(products);

  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Something went wrong!"})
  }
})

const fetchProductById = asyncHandler(async(req, res) => {
  try{
    const product = await Product.findById(req.params.id);
    if(product){
      return res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }

  }catch(error){
    console.log(error)
    res.status(500).json({message: error.message})
  }
});

const addProductReview = asyncHandler(async(req, res) => {
  try{
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id);

    if(product){
      const alreadyReviewed = product.review.find((r) => r.user.toString() === req.user._id.toString())

      if(alreadyReviewed){
        res.status(400);
        throw new Error('you already reviewed this product')
      }

      const review = {
        name:req.user.firstname,
        rating:Number(rating),
        comment,
        user:req.user._id
      };

      product.review.push(review);

      product.numReviews = product.review.length;

      product.rating = product.review.reduce((acc, item) => item.rating + acc, 0) / product.review.length;

      await product.save();
      res.status(201).json({message: "Review Added"})
    }else{
      res.status(404);
      throw new Error('Product not found')
    }




  }catch(error){
    console.log(error)
    res.status(500).json({message: error.message});
  }
})

const fetchTopProduct = asyncHandler(async(req, res) => {
  try{
    const products = await Product.find({}).sort({rating: -1}).limit(4);
    res.json(products)

  }catch(error){
    console.log(error)
    res.status(500).json({message: error.message});
  }
})

const fetchNewProduct = asyncHandler(async(req, res) => {
  try{
    const products = await Product.find({}).sort({_id: -1}).limit(5)
    res.json(products)

  }catch(error){
    console.log(error)
    res.status(500).json({message: error.message});
  }
})


  

export { addProduct, updateProduct, removeProduct, fetchProduct, fetchAllProducts, fetchProductById, addProductReview, fetchTopProduct, fetchNewProduct };
