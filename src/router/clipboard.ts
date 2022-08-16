import { base64url, oak } from "../deps.ts";
import clipboardDao from "../db/dao/clipboard.ts";
import { ClipboardItem } from "../types.ts";
import { randomBytes } from "../util/plain.ts";

const router = new oak.Router();

router.get("/item", async (ctx) => {
  // get args
  const key = ctx.request.url.searchParams.get("key");
  if (!key) {
    ctx.response.status = 400;
    return;
  }
  // find clipboard item
  const item = await clipboardDao.findOne(key);
  if (!item) {
    ctx.response.status = 404;
    return;
  }
  // response
  ctx.response.body = { text: item.text };
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
  // create and insert clipboard item
  const item: ClipboardItem = {
    text,
    key: base64url.encode(randomBytes(3)),
    createdAt: new Date(),
  };
  await clipboardDao.insertOne(item);
  // response
  ctx.response.body = { key: item.key };
});

router.delete("/item", async (ctx) => {
  // get args
  const key = ctx.request.url.searchParams.get("key");
  if (!key) {
    ctx.response.status = 400;
    return;
  }
  // delete a photo set
  const deletedCount = await clipboardDao.deleteOne(key);
  if (deletedCount === 0) {
    ctx.response.status = 404;
    return;
  }
  // response
  ctx.response.status = 200;
});

export default router;
