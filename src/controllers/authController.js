const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const {
            nombreCompleto,
            email,
            password,
            fechaNacimiento
        } = req.body;

        const usuarioExistente = await User.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({
                message: "El correo ya está registrado"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const usuario = await User.create({
            nombreCompleto,
            email,
            passwordHash,
            fechaNacimiento
        });

        res.status(201).json({
            message: "Usuario registrado correctamente",
            userId: usuario._id
        });

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                message: "Credenciales incorrectas"
            });
        }

        const passwordValida = await bcrypt.compare(
            password,
            usuario.passwordHash
        );

        if (!passwordValida) {
            return res.status(401).json({
                message: "Credenciales incorrectas"
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login exitoso",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};