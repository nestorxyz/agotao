import express from "express";

import { authVerify } from "@/shared/middlewares/authorization.handler";
import { createSession, createSessionValidator } from "./useCases";

const router = express.Router();

router.post("/sessions", createSessionValidator, authVerify, createSession);

export default router;
