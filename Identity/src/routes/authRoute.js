const express = require("express");
const {handleRegister} = require("../controllers/authController");
const router = express.Router();

router.post("/register",handleRegister);

module.exports = router;