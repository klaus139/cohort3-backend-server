import Category from "../models/categoryModels.js";
import asyncHandler from "../middleware/asyncHandler.js";



const createCategory = asyncHandler(async(req, res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.json({error: 'Name is rquired'})
        }
        const existingCat = await Category.findOne({name})
        if(existingCat){
            return res.json({error: 'category already exists'})
        }
        const category = await new Category({name}).save();
        res.status(201).json({message:'categiry created', data: category})

    }catch(error){
        console.log(error)
        throw new Error('error creating cateogry')
    }
})

export {createCategory};