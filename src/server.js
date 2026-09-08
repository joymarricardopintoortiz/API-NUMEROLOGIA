require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

const express= require("express")

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});