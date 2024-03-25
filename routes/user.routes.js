import express from "express";
import * as userController from "../controllers/user.controller.js";
const router = express.Router();

router.post("/inscription", userController.createUser);
router.post("/connexion", userController.signInUser);

export default router;
