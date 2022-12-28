import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

const transport = nodemailer.createTransport({
  pool: true,
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: true, // use TLS
  auth: {
    user: "nestor@agotao.com",
    pass: "xbtcmCHkKNWFrgPq",
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "nestor@agotao.com",
  configPath: "./mailing.config.json",
});

export default sendMail;

export * from "./emails/Basic";
