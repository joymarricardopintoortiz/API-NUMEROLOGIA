const express = require("express");

const router = express.Router();

const controller = require("../controllers/compatibilityController");
const { verificarToken } = require("../middleware/auth");

router.post("/calculate", verificarToken, controller.calculate);

module.exports=router;