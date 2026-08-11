const User = require("../models/User");
const NumerologyProfile = require("../models/NumerologyProfile");
const {
  numeroVida,
  numeroExpresion,
  numeroAlma,
} = require("../utils/numerology");

exports.calculate = async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id);

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    if (!usuario.fechaNacimiento || !usuario.nombreCompleto) {
      return res.status(400).json({
        message:
          "El usuario debe tener nombre completo y fecha de nacimiento registrados",
      });
    }

    const vida = numeroVida(usuario.fechaNacimiento.toISOString());
    const expresion = numeroExpresion(usuario.nombreCompleto);
    const alma = numeroAlma(usuario.nombreCompleto);

    const perfil = await NumerologyProfile.findOneAndUpdate(
      { userId: usuario._id },
      {
        numeroVida: vida,
        numeroExpresion: expresion,
        numeroAlma: alma,
        userId: usuario._id,
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


 
exports.profile = async (req, res) => {
  try {
    const perfil = await NumerologyProfile.findOne({
      userId: req.user.id,
    });

    if (!perfil) {
      return res.status(404).json({
        message:
          "Perfil no encontrado. Ejecuta primero POST /calculate",
      });
    }

    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};