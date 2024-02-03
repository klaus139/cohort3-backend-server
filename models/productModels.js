import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema({
    name:{type:String, required: true},
    rating:[{ type: Number , min: 1 , max :5, required: true}] ,
    comment:{type: String, required: true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Auth',
    }
},{timestamps: true})


const productShema = mongoose.Schema(
    {
        name:{type: String, required: true},
        image:{type: String, required: true},
        brand:{type: String, required: true},
        quantity:{type:Number, required: true},
        category:{type:ObjectId, ref:"Category",required:true},
        description:{type: String, required: true},
        review:[reviewSchema],
        rating:{type: Number, required: true, default: 0},
        numReviews:{type:Number, required: true, default:0},
        price:{type: Number, required: true, default:0},
        countInStock:{type: Number,required:true, default:0},
    },
    {timestamps:true}
)

const Product = mongoose.model('Product', productShema);

export default Product;