const mongoose = require("mongoose");

const compatibilitySchema = new mongoose.Schema({

    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    puntaje: Number,

    intepretacion: String,

    fecha: {
        type: Date,
        default: Date.now
    }

});

module.exports=mongoose.model("CompatibilityMatch",compatibilitySchema);