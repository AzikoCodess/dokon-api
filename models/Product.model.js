const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ["elektronika", "kiyim", "oziq-ovqat", "kitoblar", "sport", "kosmetika"]
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

module.exports = Product