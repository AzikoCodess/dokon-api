const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserDto = require("../Dtos/user.dto")

const register = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ error: "Bunday foydalanuvchi mavjud" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, password: hashedPassword })
        await newUser.save()
        const userDto = new UserDto(newUser)
        res.status(201).json({ message: "User created successfully", user: userDto })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: "Bunday foydalanuvchi topilmadi" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Bunday foydalanuvchi topilmadi !" })
        }
        const userDto = new UserDto(user)
        const token = jwt.sign({ id: userDto.id, role: userDto.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({ message: "User logged in successfully", user: userDto, token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { register, login }
