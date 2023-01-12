import express from "express";

import { authVerify } from "@/shared/middlewares/authorization.handler";
import { createSession } from "./useCases";

const router = express.Router();

router.post("/sessions", authVerify, createSession);

export default router;
