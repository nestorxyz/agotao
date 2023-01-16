import { createServer } from "@/server";

import {
  errorHandler,
  logError,
  boomErrorHandler,
  joiErrorHandler,
} from "@/shared/middlewares/error.handler";

// Routes
import routerApi from "@/shared/routes";

const port = process.env.PORT || 5001;
const server = createServer();

server.get("/", (req, res) => {
  return res.sendFile("index.html", { root: __dirname });
});

server.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

routerApi(server);

server.use(logError);
server.use(joiErrorHandler);
server.use(boomErrorHandler);
server.use(errorHandler);

server.listen(port, () => {
  console.log(`api running on http://localhost:${port}`);
});
