const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const audit = require("./middleware/audit");

const authRoutes = require("./routes/authRoutes");
const numerologyRoutes = require("./routes/numerologyRoutes");
const readingRoutes = require("./routes/readingsRoutes");
const compatibilityRoutes = require("./routes/compatibilityRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(audit);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/numerology", numerologyRoutes);
app.use("/api/v1/readings", readingRoutes);
app.use("/api/v1/compatibility", compatibilityRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API Numerologia funcionando"
    });
});

module.exports = app;