const router = require('express').Router()
const orderCtrl = require('../controllers/orderCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/order')
    .get( orderCtrl.getOrders)
    .post(orderCtrl.createOrder)

router.put('/order/:id').put(orderCtrl.updateOrder)

module.exports = router