import productModel from "../models/productModel.js"

export const stockDown = async(req,res)=>{
    const {productId} = req.body
    try {
        let product = await productModel.findOneAndUpdate({_id:productId},{
            $inc:{stock:-1}
        })
     
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
        
    }
}
export const stockup = async(req,res)=>{
    const {productId} = req.body
    try {
        let product = await productModel.findOneAndUpdate({_id:productId},{
            $inc:{stock:1}
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
        
    }
}