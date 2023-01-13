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
  return res.json({
    message: "Hi, what are you going to ship today?",
    "Show us on Twitter": "https://twitter.com/nestoredduardo",
  });
});

routerApi(server);

server.use(logError);
server.use(joiErrorHandler);
server.use(boomErrorHandler);
server.use(errorHandler);

server.listen(port, () => {
  console.log(`api running on http://localhost:${port}`);
});
