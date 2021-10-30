import { crypto } from "../deps.ts";

const encoder = new TextEncoder();

const hash = async (data: string, salt: string) => {
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(data + salt),
  );
  const view = new Uint32Array(buffer);
  const hashStr = view[0]
    .toString(32)
    .slice(0, 4)
    .toUpperCase()
    .replace(/I/g, "W")
    .replace(/O/g, "X");
  return hashStr;
};

export default hash;
