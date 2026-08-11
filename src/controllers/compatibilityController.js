const User = require("../models/User");
const NumerologyProfile = require("../models/NumerologyProfile");
const CompatibilityMatch = require("../models/CompatibilityMatch");

exports.calculate = async (req, res) => {
    try {
        const { userId } = req.body;

        if(!userId) {
            return res.status(400).json({
                message: "userId es requerido"
            });
        }

        const usuarioActual = await User.findById(req.user.id);
        const otroUsuario = await User.findById(userId);

        if (!usuarioActual || !otroUsuario) {
            return res.status(404).json({
                message: "Uno de los usuarios no existe"
            });
        }

        const perfilActual = await NumerologyProfile.findOne({
            userId: usuarioActual._id
        });

        const perfilOtro = await NumerologyProfile.findOne({
            userId: otroUsuario._id
        });

        if (!perfilActual || !perfilOtro) {
            return res.status(404).json({
                message: "Ambos usuarios deben tener un perfil numerológico calculado"
            });
        }

        const numerosActual = [
            perfilActual.numeroVida,
            perfilActual.numeroExpresion,
            perfilActual.numeroAlma
        ];

        const numerosOtro = [
            perfilOtro.numeroVida,
            perfilOtro.numeroExpresion,
            perfilOtro.numeroAlma
        ];

        let coincidencias = 0;

        numerosActual.forEach((numero) => {
            if (numerosOtro.includes(numero)) {
                coincidencias++;
            }
        });

        const porcentaje = Math.round(
            (coincidencias / 3) * 100
        );

        let nivel;

        if (porcentaje >= 67) {
            nivel = "Alta";
        } else if (porcentaje >= 34) {
            nivel= "Media";
        } else {
            nivel = "Baja";
        }

        const resultado = await CompatibilityMatch.create({
            userId: usuarioActual._id,
            compatibleUserId: otroUsuario._id,
            porcentaje,
            nivel
        });

        res.status(200).json({
            message: "Compatibilidad calculada",
            resultado
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};