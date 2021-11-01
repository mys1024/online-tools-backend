import { Router } from "../deps.ts";
import config from "./config.ts";
import { accessText, countTexts, deleteText, saveText } from "./store.ts";

const router = new Router();

router.get("/text", (ctx) => {
  // parse accessCode
  const accessCode = ctx.request.url.searchParams.get("accessCode");
  // check accessCode
  if (typeof accessCode !== "string") {
    ctx.response.status = 400;
    return;
  }
  // try to access the associated text
  const text = accessText(accessCode);
  if (!text) {
    ctx.response.status = 404;
    return;
  }
  // response
  ctx.response.body = { text };
});

router.post("/text", async (ctx) => {
  // parse body
  let body: unknown;
  try {
    body = await ctx.request.body({ type: "json" }).value as unknown;
  } catch (err: unknown) {
    if (!(err instanceof TypeError)) {
      throw err;
    }
    ctx.response.status = 400;
    return;
  }
  // check body
  if (typeof body !== "object" || !body) {
    ctx.response.status = 400;
    return;
  }
  const { text } = body as { text: unknown };
  // check text
  if (typeof text !== "string") {
    ctx.response.status = 400;
    return;
  }
  if (text.length > config.maxLengthOfText) {
    ctx.response.status = 403;
    return;
  }
  // try to save the text
  const accessCode = await saveText(text);
  if (!accessCode) {
    ctx.response.status = 507;
    return;
  }
  // set timeout for text
  setTimeout(() => deleteText(accessCode), config.timeout);
  // response
  ctx.response.body = { accessCode };
});

router.delete("/text", (ctx) => {
  // parse accessCode
  const accessCode = ctx.request.url.searchParams.get("accessCode");
  // check accessCode
  if (typeof accessCode !== "string") {
    ctx.response.status = 400;
    return;
  }
  // try to delete the associated text
  const isExist = deleteText(accessCode);
  if (!isExist) {
    ctx.response.status = 404;
    return;
  }
  // response
  ctx.response.status = 200;
});

router.get("/status", (ctx) => {
  ctx.response.body = {
    numberOfTexts: countTexts(),
    ...config,
  };
});

export default router;
