import { oak, oakCors } from "./deps.ts";
import logger from "./middleware/logger.ts";
import router from "./router/root.ts";

const app = new oak.Application();

// middleware
app.use(logger());
app.use(oakCors());

// router
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
