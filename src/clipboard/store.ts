import hash from "./hash.ts";
import config from "./config.ts";

/**
 * A map that stores all texts.
 */
const textStore = new Map<string, string>();

/**
 * Generate an access code for a text.
 * @param text the text
 * @param salt string salt
 * @returns access code
 */
const generateAccessCode = async (text: string, salt = ""): Promise<string> => {
  const accessCode = await hash(text, Date.now().toString() + salt);
  if (textStore.has(accessCode)) {
    return generateAccessCode(text, accessCode);
  } else {
    return accessCode;
  }
};

/**
 * Try to access a text by its associated access code.
 * If success, return the text; otherwise, return undefined.
 * @param accessCode access code
 * @returns the associated text or undefined
 */
export const accessText = (accessCode: string) => {
  return textStore.get(accessCode);
};

/**
 * Try to save a text into the textStore.
 * If success, return the access code; otherwise, return undefined.
 * @param text the text to be save
 * @returns access code or undefined
 */
export const saveText = async (text: string) => {
  if (textStore.size >= config.maxNumberOfTexts) {
    return;
  }
  const accessCode = await generateAccessCode(text);
  textStore.set(accessCode, text);
  return accessCode;
};

/**
 * Try to delete a text.
 * If success, return true; otherwise, return false.
 * @param accessCode access code
 * @returns whether the associated text was deleted
 */
export const deleteText = (accessCode: string) => {
  if (!textStore.has(accessCode)) {
    return false;
  }
  textStore.delete(accessCode);
  return true;
};

/**
 * Return the number of texts.
 * @returns the number of texts
 */
export const countTexts = () => {
  return textStore.size;
};
