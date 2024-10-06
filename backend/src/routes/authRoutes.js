import express from "express";
import {
  getMe,
  login,
  refreshAccessToken,
  signup,
  verifierCodeEtCreerUtilisateur,
  setImageProfile,
  logout,
  renvoyerCodeVerification,
} from "../controllers/authController.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/passwordController.js";
import protectedRoute from "../middlewares/protectedRoute.js";
import upload from "../middlewares/uploadMiddle.js";

const router = express.Router();

// Routes utilisateur
router.get("/me/:profileId", protectedRoute, getMe);
router.get("/me/", protectedRoute, getMe);


// Inscription
router.post("/signup", signup); // Étape 1 : Inscription et envoi du code de vérification
router.post("/verify-signup", verifierCodeEtCreerUtilisateur); // Étape 2 : Vérification du code et création de l'utilisateur
router.post("/resend-code", renvoyerCodeVerification); // Étape 3 : Renvoyer le code de vérification

router.post("/login", login);
router.post("/logout", logout);

// Mot de passe
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Jetons
router.get("/token", refreshAccessToken);

// Gestion de l'image de profil
router.post(
  "/profileImage",
  protectedRoute,
  upload.single("profileImage"),
  setImageProfile
);

export default router;
