import cartModel from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  const { productId, userId } = req.body;


  try {
    const existing = await cartModel.find({ userId:userId });

    if (existing.length) {
   
      let cartProduct = await cartModel.find({
        userId,
        "products.productId": productId,
      });

      if (cartProduct.length) {
       
        let cart = await cartModel.findOneAndUpdate(
          { userId:userId, "products.productId": productId },
          { $inc: { "products.$.quantity": 1 } }
        );
        res.status(201).json(cart);
      } else {
        let proudct = { productId, quantity: 1 };
        let cart = await cartModel.findOneAndUpdate(
      
          { userId },
          { $push: { products: proudct } }
        );

        res.status(201).json(cart);
      }
    } else {
      
      let product = {
        userId,
        products: [{ productId, quantity: 1 }],
      };

      let cart = await cartModel.create(product);
      res.status(201).json(cart);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
