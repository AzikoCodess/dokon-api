const Order = require("../models/Order.model")
const Product = require("../models/Product.model")

exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body
        let totalPrice = 0
        for (let item of items) {
            const product = await Product.findById(item.product)
            if (!product) return res.status(404).json({ error: "Maxsulot topilmadi" })
            totalPrice += product.price * item.quantity
        }

        const order = new Order({
            user: req.user.id,
            items, totalPrice
        })
        await order.save()
        res.status(201).json({ message: "Buyurtma yaratildi", order })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
        res.status(200).json({ orders })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}