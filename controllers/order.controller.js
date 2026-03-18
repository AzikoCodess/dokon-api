const Order = require("../models/Order.model")
const Product = require("../models/Product.model")

exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body
        // items = [ {product: "telefon_id", quantity: 2}, ... ]
        let totalPrice = 0
        for (let item of items) {
            // item = { product: "telefon_id", quantity: 2 }
            const product = await Product.findById(item.product)
            // item.product = "telefon_id"
            // product = { name: "Telefon", price: 950, quantity: 5 }
            if (!product) return res.status(404).json({ error: "Mahsulot topilmadi" })
            if (product.quantity < item.quantity) {
                return res.status(400).json({ error: `${product.name} mahsulot yetarli emas` })
            }
            totalPrice += product.price * item.quantity
            product.quantity -= item.quantity
            await product.save()
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
            .populate("items.product", "name price")
        res.status(200).json({ orders })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Siz admin emassiz" })
        }
        const orders = await Order.find()
            .populate("user", "email")
            .populate("items.product", "name price")
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params
        const orderId = await Order.findById(id)
        if (req.user.role !== "admin" && req.user.id !== orderId.user.toString()) {
            return res.status(403).json({ error: "Bu sizning buyurtmangiz emas" })
        }
        await Order.findByIdAndDelete(id)
        res.status(200).json({ message: "Buyurtma o'chirildi" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}