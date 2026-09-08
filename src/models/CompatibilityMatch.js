const mongoose = require("mongoose");

const compatibilitySchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    compatibleUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    porcentaje: Number,

    nivel: String,

    fecha: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("CompatibilityMatch", compatibilitySchema);