import type { ClipboardItem, ClipboardItemSchema } from "../../types.ts";
import { Collection } from "../../deps.ts";
import db from "../db.ts";

class ClipboardDao {
  #collection: Collection<ClipboardItemSchema>;

  constructor(collection: Collection<ClipboardItemSchema>) {
    this.#collection = collection;
  }

  async findOne(key: string) {
    return await this.#collection.findOne({ key });
  }

  async insertOne(clipboardItem: ClipboardItem) {
    return await this.#collection.insertOne(clipboardItem);
  }

  async deleteOne(key: string) {
    return await this.#collection.deleteOne({ key });
  }
}

const clipboardDao = new ClipboardDao(
  db.collection<ClipboardItemSchema>("clipboard"),
);

export default clipboardDao;
