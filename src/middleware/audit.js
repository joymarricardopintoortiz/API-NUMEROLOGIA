const AuditLog = require("../models/AuditLog");

const audit = (req, res, next) => {

    res.on("finish", async () => {
        try {
            await AuditLog.create({
                endpoint: req.originalUrl,
                metodo: req.method,
                statusCode: res.statusCode,
                timestamps: new Date(),
                userId: req.user?.id || null
            });
        } catch (error) {
            console.error("Error al guardar audiotía:", error.message);
        }
    });
    next();
};

module.exports = audit;