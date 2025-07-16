import express from "express";
const router = express.Router();
import submitController from "../controllers/submit.controller.js";

router.post("/submit",submitController);

export default router;
