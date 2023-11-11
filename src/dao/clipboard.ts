/// <reference lib="deno.unstable" />

const EXPIRE_IN = 1000 * 60 * 30; // 30 minutes

const kv = await Deno.openKv();

export async function setClipboardData(key: string, data: string) {
  const result = await kv.set(["clipboard", key], data, {
    expireIn: EXPIRE_IN,
  });
  return result.ok;
}

export async function getClipboardData(key: string) {
  const result = await kv.get<string>(["clipboard", key]);
  return result.value;
}

export async function deleteClipboardData(key: string) {
  await kv.delete(["clipboard", key]);
}
