import { ObjectId } from "./deps.ts";

export interface MongoObject {
  _id: ObjectId;
}

export interface MaybeMongoObject {
  _id?: unknown;
}

export interface ClipboardItem {
  key: string;
  text: string;
  createdAt: Date;
}

export type ClipboardItemSchema = ClipboardItem & MongoObject;

export type MaybeClipboardItemSchema = ClipboardItem & MaybeMongoObject;
