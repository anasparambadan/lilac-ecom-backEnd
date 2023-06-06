import { Router } from 'express'
import productModel from '../models/productModel.js';
import verifyToken from '../middleware/verifyToken.js';
import { stockDown, stockup } from '../controller/productController.js';
const router = Router();

// decrement stock

router.put('/dec',stockDown)
router.put('/inc',stockup)

//add product

router.post('/',verifyToken, async(req,res)=>{
    const newProduct = new productModel(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
        
    }
})

// get product

router.get('/find/:id',async(req,res)=>{

    try {
        const product = await productModel.findById(req.params.id)
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json(error)
    }

})

// get all products

router.get('/', async(req,res)=>{
    try {

        const products = await productModel.find()
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500).json(error)   
    }
})



export default router