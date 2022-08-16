import { oak } from "../deps.ts";

import clipboardRouter from "./clipboard.ts";

const router = new oak.Router();

router.use(
  "/clipboard",
  clipboardRouter.routes(),
  clipboardRouter.allowedMethods(),
);

export default router;
