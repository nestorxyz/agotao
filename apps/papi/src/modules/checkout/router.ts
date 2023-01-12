import express from "express";

const router = express.Router();

router.post("/sessions", (req, res) => {
  res.send("I am a user");
});

export default router;
