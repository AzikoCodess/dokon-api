const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: mongoose.Schema.Types.ObjectId,
            quantity: Number
        }
    ],
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    status: {
        type: String,
        enum: ["kutilmoqda", "jarayonda", "yetkazilmoqda", "yetkazildi", "bekor qilindi"],
        default: "kutilmoqda"
    }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)

module.exports = Order