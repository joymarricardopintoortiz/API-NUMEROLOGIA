const express = require("express");
const router = express.Router();

const {
    calculate,
    profile,
} = require("../controllers/numerologyController");

const { verificarToken } = require("../middleware/auth");

router.post("/calculate", verificarToken, calculate);
router.get("/profile", verificarToken, profile);

module.exports = router;