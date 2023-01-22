import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

const transport = nodemailer.createTransport({
  pool: true,
  host: process.env.EMAIL_HOST as string,
  port: process.env.EMAIL_PORT as unknown as number,
  secure: true, // use TLS
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASSWORD,
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "nestor@agotao.com",
  configPath: "./mailing.config.json",
});

export default sendMail;
