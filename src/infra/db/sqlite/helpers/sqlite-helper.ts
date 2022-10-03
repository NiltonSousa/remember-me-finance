import sqlite3 from "sqlite3";

export const SQliteHelper = {
  client: null as sqlite3.Database,

  async connect(url: string) {
    return (this.client = new sqlite3.Database(url));
  },

  async disconnect() {
    await this.client.close();
  },
};
