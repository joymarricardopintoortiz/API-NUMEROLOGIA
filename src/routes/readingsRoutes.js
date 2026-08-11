const express = require("express");

const router = express.Router();

const controller = require("../controllers/readingController");
const { verificarToken } = require("../middleware/auth");

router.post("/generate", verificarToken, controller.generate);
router.get("/history", verificarToken, controller.history);

module.exports = router;