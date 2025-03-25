// packages/agents/customer/index.ts
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const getDB = async () => {
  return open({
    filename: './database.sqlite', // adjust path as needed
    driver: sqlite3.Database
  });
};

export const logCustomerActivity = async (userId: string, activity: string) => {
  const db = await getDB();
  await db.run(
    'INSERT INTO customer_activity (user_id, activity, timestamp) VALUES (?, ?, ?)',
    [userId, activity, new Date().toISOString()]
  );
};

export const generateRecommendations = async (userId: string) => {
  //Recommendation logic here using ollama
}