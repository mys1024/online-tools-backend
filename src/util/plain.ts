import { concat, crypto } from "../deps.ts";

const encoder = new TextEncoder();

export async function blake3(...data: (string | Uint8Array)[]) {
  const buffers = data.map((d) =>
    typeof d === "string" ? encoder.encode(d) : d
  );
  const digest = await crypto.subtle.digest(
    "BLAKE3",
    concat(...buffers),
  );
  return new Uint8Array(digest);
}

export function randomUint8() {
  let num = 0;
  for (let i = 0; i < 8; i++) {
    num <<= 1;
    num |= Math.random() > 0.5 ? 1 : 0;
  }
  return num;
}

export function randomBytes(length: number) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(randomUint8());
  }
  return new Uint8Array(arr);
}

export async function asyncIgnoreError<T>(func: () => Promise<T>) {
  try {
    return await func();
  } catch (_err) {
    return undefined;
  }
}

export function syncIgnoreError<T>(func: () => T) {
  try {
    return func();
  } catch (_err) {
    return undefined;
  }
}
