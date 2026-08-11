const Reading = require("../models/Reading");
const NumerologyProfile = require("../models/NumerologyProfile");
const { generarLectura } = require("../services/aiService");

exports.generate = async (req, res) => {
    try {
        const perfil = await NumerologyProfile.findOne({
            userId: req.user.id
        });

        if (!perfil) {
            return res.status(404).json({
                message: "Primero calcule su perfil"
            });
        }

        const prompt = `
El usuario posee:

Número de Vida: ${perfil.numeroVida}
Número de Expresión: ${perfil.numeroExpresion}
Número del Alma: ${perfil.numeroAlma}

Genera una lectura general de personalidad.
`;

        const respuesta = await generarLectura(prompt);

        const lectura = await Reading.create({
            userId: req.user.id,
            prompt,
            respuesta,
            tipo: "general"
        });

        res.status(201).json(lectura);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.history = async (req, res) => {
    try {
        const historial = await Reading.find({
            userId: req.user.id
        }).sort({ fecha: -1 });

        res.status(200).json(historial);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};