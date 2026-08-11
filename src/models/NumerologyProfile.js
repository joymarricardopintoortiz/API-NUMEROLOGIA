const mongoose = require("mongoose");

const numerologyProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        numeroVida: {
            type: Number,
            required: true,
        },
        numeroExpresion: {
            type: Number,
            required: true,
        },
        numeroAlma: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("NumerologyProfile", numerologyProfileSchema);