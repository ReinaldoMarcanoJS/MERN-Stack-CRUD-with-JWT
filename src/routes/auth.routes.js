const { Router } = require("express")
const authRequire = require('../middlewares/ValidateToken')
const ValidateSchema = require("../middlewares/Validator.middleware.js")
const { loginSchema, reisterSchema } = require("../schemas/auth.schema.js")
const { login, register, logout, profile, verifyToken } = require("../controllers/auth.controller.js")

const router = Router();

router.post("/register", ValidateSchema(reisterSchema), register);
router.post("/login", ValidateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequire, profile);

module.exports = router;