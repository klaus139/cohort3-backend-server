import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModels.js";

const addProduct = asyncHandler(async(req, res) => {
    try{

        const {name, description, price, category, quantity, brand} = req.fields;

        //validation
        switch(true){
            case !name:
                return res.json({error: 'Name is required'})
            case !description:
                return res.json({error:'Description is required'});
            case !brand:
                return res.status(400).json('Brand is Required')
            case !price:
                return res.status(400).json('Price is Required')
            case !category: 
                return res.status(400).json("Category is required")
            case !quantity:
                return  res.status(400).json("Quantity must be a number greater than zero")
            
        }

        const product = new Product({...req.fields});
        await product.save();
        res.json({
            product
        })
    }catch(error){
        console.log("Error in adding product : ", error);
        res.status(401).json({message: 'Something went wrong!'});
    }
})


export {addProduct};