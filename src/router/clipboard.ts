import { base64url, oak } from "../deps.ts";
import {
  deleteClipboardData,
  getClipboardData,
  setClipboardData,
} from "../dao/clipboard.ts";
import { randomBytes } from "../util/plain.ts";

const router = new oak.Router();

router.get("/item", async (ctx) => {
  // get args
  const key = ctx.request.url.searchParams.get("key");
  if (!key) {
    ctx.response.status = 400;
    return;
  }
  // get a clipboard item
  const item = await getClipboardData(key);
  if (item === null) {
    ctx.response.status = 404;
    return;
  }
  // response
  ctx.response.body = { text: item };
});

router.post("/item", async (ctx) => {
  // get args
  const body = ctx.request.body();
  if (body.type !== "json") {
    ctx.response.status = 400;
    return;
  }
  const text = (await body.value)?.text;
  if (!text) {
    ctx.response.status = 400;
    return;
  }
  // set a clipboard item
  const key = base64url.encode(randomBytes(3));
  setClipboardData(key, text);
  // response
  ctx.response.body = { key };
});

router.delete("/item", async (ctx) => {
  // get args
  const key = ctx.request.url.searchParams.get("key");
  if (!key) {
    ctx.response.status = 400;
    return;
  }
  // delete a clipboard item
  const deletedCount = await deleteClipboardData(key);
  // response
  ctx.response.status = 200;
});

export default router;
