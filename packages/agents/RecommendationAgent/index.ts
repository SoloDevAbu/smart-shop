// packages/agents/recommendation/index.ts
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const getDB = async () => {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
};

export const generateRecommendations = async (userId: string) => {
  const db = await getDB();
  const activities = await db.all(
    'SELECT activity FROM customer_activity WHERE user_id = ? ORDER BY timestamp DESC LIMIT 5',
    [userId]
  );

  // Simple logic for MVP: return recommendations based on recent activities.
  return activities.map((a: any) => `Based on your activity "${a.activity}", we recommend Product XYZ`);
};
