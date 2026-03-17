const express = require("express")
const router = express.Router()
const { createOrder, myOrders, getAllOrders } = require("../controllers/order.controller")
const authMiddleware = require("../middleware/auth.middleware")

/**
 * @swagger
 * /orders/create:
 *   post:
 *     summary: Buyurtma yaratish
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - totalPrice
 *             properties:
 *               items:
 *                 type: array
 *                 example:
 *                   - product: "665f1a2b3c4d5e6f7a8b9c1d"
 *                     quantity: 2
 *
 *     responses:
 *       201:
 *         description: Buyurtma yaratildi
 *
 *       401:
 *         description: Token yo'q
 *
 *       500:
 *         description: Server xatosi
 */
router.post("/create", authMiddleware, createOrder)

/**
 * @swagger
 * /orders/myOrders:
 *   get:
 *     summary: Foydalanuvchining buyurtmalari
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Buyurtmalar ro'yxati
 *
 *       401:
 *         description: Token yo'q
 *
 *       500:
 *         description: Server xatosi
 */
router.get("/myOrders", authMiddleware, myOrders)

/**
 * @swagger
 * /orders/getAllOrders:
 *   get:
 *     summary: Barcha buyurtmalar
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Buyurtmalar ro'yxati
 *
 *       401:
 *         description: Token yo'q
 *
 *       500:
 *         description: Server xatosi
 */
router.get("/getAllOrders", authMiddleware, getAllOrders)

module.exports = router