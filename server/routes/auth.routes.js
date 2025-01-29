const express = require('express');
const { login, getUser, logout } = require('../controllers/auth.controller');
const authRoutes = express.Router();

authRoutes.post("/google-login", login);
authRoutes.get("/get-user", getUser);
authRoutes.post("/logout", logout);  // Add logout route

module.exports = authRoutes;
