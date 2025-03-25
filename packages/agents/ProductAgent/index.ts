// packages/agents/product/index.ts
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const getDB = async () => {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
};

export const getProduct = async (id: string) => {
  const db = await getDB();
  return await db.get('SELECT * FROM products WHERE id = ?', [id]);
};

export const updateProduct = async (id: string, data: any) => {
  const db = await getDB();
  // For demonstration, assuming data is an object with a single key-value pair, e.g., { stock: 50 }
  const key = Object.keys(data)[0];
  const value = data[key];
  const sql = `UPDATE products SET ${key} = ? WHERE id = ?`;
  await db.run(sql, [value, id]);
};
