const Orders = require('../models/orderModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')


const orderCtrl = {
    getOrders: async(req, res) =>{
        try {
            const orders = await Orders.find()
            res.json(orders)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createOrder: async(req, res) => {
        try {
            const newOrder = new Orders(req.body)

            
            await newOrder.save()
            res.json({msg: "Order Succes!"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateOrder:async(req,res)=>{
        try{
         const status=req.body.status;
         await Orders.findOneAndUpdate({_id:req.params.id},{status})
         res.status(200).json("updated order!")
        }
        catch(err){
           return res.status(500).json("cannot update order")
        }
    }
}

const sold = async (id, quantity, oldSold) =>{
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

module.exports = orderCtrl