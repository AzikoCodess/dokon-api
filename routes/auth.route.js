const express = require("express")
const router = express.Router()
const { register, login } = require("../controllers/auth.controller")

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Ro'yxatdan o'tish
 *     tags: [Auth]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *
 *     responses:
 *       201:
 *         description: User yaratildi
 *
 *       500:
 *         description: Server xatosi
 */
router.post("/register", register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login qilish
 *     tags: [Auth]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *
 *     responses:
 *       200:
 *         description: Login muvaffaqiyatli
 *
 *       401:
 *         description: Parol noto'g'ri
 *
 *       404:
 *         description: User topilmadi
 *
 *       500:
 *         description: Server xatosi
 */
router.post("/login", login)

module.exports = router