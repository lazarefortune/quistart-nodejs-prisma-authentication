import dotenv from "dotenv";
import app from "./app.js";
import { PrismaClient } from "@prisma/client"
dotenv.config();

const PORT = process.env.APP_PORT || 4000;

const prisma = new PrismaClient()

//check if database is connected
prisma.$connect()
    .then(() => {
        console.log("🚀 Database connected")
    })
    .catch((err) => {
        console.log("🧨 Database connection failed")
        console.log(err)
    })

app.get("/api", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome API",
    });
})

app.listen(PORT, () => {
    console.log(`✅  Server running on port ${PORT}`);
})