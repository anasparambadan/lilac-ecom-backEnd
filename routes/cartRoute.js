import { Router } from 'express'
import cartModel from '../models/cartModel.js';
import verifyToken from '../middleware/verifyToken.js';
import { addToCart } from '../controller/cartController.js';

const router = Router();

// create cart

router.post('/',verifyToken,addToCart)

// update cart

router.put('/:id', async(req,res)=>{
    try {
        const updatedCart = await cartModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(201).json(updatedCart)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete cart

router.delete('/:id',async(req,res)=>{
    try {
        await cartModel.findByIdAndDelete(req.params.id)
        res.status(200).json('cart deleted')
        
    } catch (error) {
        res.status(500).json(error)
    }
})

// get user cart

router.get('/find/:id',async(req,res)=>{

    try {
        const cart = await cartModel.findOne({userId:req.params.id})
        res.status(200).json(cart)
        
    } catch (error) {
        res.status(500).json(error)
    }

})

// get all products



export default router