require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    });

const authRoute = require("./routes/auth.route")
const productRoute = require("./routes/product.route")
const orderRoute = require("./routes/order.route")


app.use("/auth", authRoute)
app.use("/products", productRoute)
app.use("/orders", orderRoute)
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Dokon API",
            version: "1.0.0",
            description: "Dokon boshqaruvi"
        },
        servers: [
            { url: process.env.BASE_URL }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ["./routes/*.js"]
};

swaggerDocument = swaggerJsdoc(swaggerOptions);
app.use("/api-dokon", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


// Models:
//   - User (name, email, password, role)
//   - Product (name, description, price, category, quantity)
//   - Order (user, items, totalPrice, status)

// Routes:
//   - /auth → register, login
//   - /products → CRUD (admin), ko'rish (hammaga)
//   - /orders → buyurtma berish, o'z buyurtmalari, barcha buyurtmalar (admin)