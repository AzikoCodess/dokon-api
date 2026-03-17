const Product = require("../models/Product.model")

const createProduct = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Maxsulot qo'shish huquqiga ega emassiz" })
        }
        const { name, description, price, category, quantity } = req.body
        const newProduct = new Product({ name, description, price, category, quantity })
        await newProduct.save()
        res.status(201).json({ message: "Maxsulot yaratildi", product: newProduct })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(404).json({ message: "Maxsulot o'zgartirish huquqiga ega emassiz" })
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!product) {
            return res.status(404).json({ error: "Maxsulot topilmadi" })
        }
        res.json({ message: "Maxsulot o'zgartirildi", product })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(404).json({ error: "Maxsulot o'chirish huquqiga ega emassiz" })
        }
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).json({ error: "Maxsulot topilmadi" })
        }
        res.json({ message: "Maxsulot o'chirildi", product })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createProduct, getAllProducts, updateProduct, deleteProduct }