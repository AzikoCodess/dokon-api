const express = require("express")
const router = express.Router()
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/product.controller")
const authMiddleware = require("../middleware/auth.middleware")

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Maxsulot qo'shish (admin)
 *     tags: [Products]
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
 *               - name
 *               - price
 *               - category
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Telefon
 *
 *               description:
 *                 type: string
 *                 example: Yangi model
 *
 *               price:
 *                 type: number
 *                 example: 1000
 *
 *               category:
 *                 type: string
 *                 example: elektronika
 *
 *               quantity:
 *                 type: number
 *                 example: 5
 *
 *     responses:
 *       201:
 *         description: Maxsulot yaratildi
 *
 *       403:
 *         description: Ruxsat yo'q
 *
 *       500:
 *         description: Server xatosi
 */
router.post("/create", authMiddleware, createProduct)

/**
 * @swagger
 * /products/allProducts:
 *   get:
 *     summary: Barcha maxsulotlarni olish
 *     tags: [Products]
 *
 *     responses:
 *       200:
 *         description: Maxsulotlar ro'yxati
 *
 *       500:
 *         description: Server xatosi
 */
router.get("/allProducts", getAllProducts)

/**
 * @swagger
 * /products/update/{id}:
 *   put:
 *     summary: Maxsulotni o'zgartirish (admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               quantity:
 *                 type: number
 *
 *     responses:
 *       200:
 *         description: Maxsulot o'zgartirildi
 *
 *       404:
 *         description: Maxsulot topilmadi yoki ruxsat yo'q
 *
 *       500:
 *         description: Server xatosi
 */
router.put("/update/:id", authMiddleware, updateProduct)

/**
 * @swagger
 * /products/delete/{id}:
 *   delete:
 *     summary: Maxsulotni o'chirish (admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *
 *     responses:
 *       200:
 *         description: Maxsulot o'chirildi
 *
 *       404:
 *         description: Maxsulot topilmadi yoki ruxsat yo'q
 *
 *       500:
 *         description: Server xatosi
 */
router.delete("/delete/:id", authMiddleware, deleteProduct)
module.exports = router

