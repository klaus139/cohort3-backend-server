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

// update category
const updateCategory = asyncHandler(async(req, res) => {
    try{
        const {name} = req.body;
        const {categoryId} = req.params;
        const category = await Category.findOne({_id: categoryId})
        if(!category){
            return res.status(404).json({message: 'Category not found'});
        }
        category.name = name;
        const updatedCategory = await category.save();
        res.status(200).json({message:'category updated succesfully', data:updatedCategory});

    }catch(error){
        res.status(400).json(error.message)
    }
})

//get all categories
const allCategories = asyncHandler(async(req, res) => {
    try{
        const allCategories = await Category.find({});
        res.status(200).json({
            allCategories
        })

    }catch(error){
        res.status(400).json(error.message) 
    }
})

//get a category
const getCategoryById = asyncHandler(async(req, res) => {
    try{
        const category = await Category.findOne({_id: req.params.id});
       
        res.status(200).json(category);

    }catch(error){
        res.status(400).json(error.message) 
    }
})

const deleteCategory = asyncHandler(async(req, res) => {
    try{
        const removed = await Category.findOneAndDelete(req.params.categoryId);
        res.status(200).json({message:'category deleted successfully'});
    }catch(error){
        res.status(400).json({message: 'error deleteing category'}) 
    }
})


export {createCategory, updateCategory, allCategories, getCategoryById, deleteCategory};