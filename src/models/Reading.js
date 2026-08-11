const mongoose = require("mongoose");

const readingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    prompt: String,
    respuesta: String,
    tipo: String,
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model("Reading",readingSchema);