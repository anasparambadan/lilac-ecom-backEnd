import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
       productName:{
        type:String, required:true
       },
       image:{
        type:String, required:true
       },
       price:{
        type:Number, required:true
       },
       stock:{
        type:Number, required:true
       },
       inStock:{
        type:Boolean,default:true
       }

    },
    { timestamps: true }
)

const productModel = mongoose.model("products", productSchema)
export default productModel