// api.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// Helper: compute percentage (simple average of day1..day4)
function computePercentage(row) {
  const sum = (Number(row.day1) || 0) + (Number(row.day2) || 0) + (Number(row.day3) || 0) + (Number(row.day4) || 0);
  return (sum / 4);
}

// GET /api/students  -> returns all students
router.get('/students', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM RollNoStudent');
    res.json(rows);
  } catch (err) {
    console.error('DB error (students):', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/recompute -> recompute percentage for all rows in DB and update table
router.post('/recompute', async (req, res) => {
  try {
    // Fetch all rows
    const [rows] = await db.query('SELECT rollno, day1, day2, day3, day4 FROM RollNoStudent');
    const updates = [];
    for (const r of rows) {
      const pct = Math.round(((Number(r.day1)||0) + (Number(r.day2)||0) + (Number(r.day3)||0) + (Number(r.day4)||0)) / 4 * 100) / 100;
      updates.push(db.query('UPDATE RollNoStudent SET percentage = ? WHERE rollno = ?', [pct, r.rollno]));
    }
    await Promise.all(updates);
    res.json({ updated: true, rowsUpdated: rows.length });
  } catch (err) {
    console.error('DB error (recompute):', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/stats -> returns max, min, average percentage
router.get('/stats', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT percentage FROM RollNoStudent');
    if (!rows.length) return res.json({ count: 0, max: 0, min: 0, avg: 0 });
    const nums = rows.map(r => Number(r.percentage) || 0);
    const max = Math.max(...nums);
    const min = Math.min(...nums);
    const avg = Math.round((nums.reduce((a,b) => a+b,0) / nums.length) * 100) / 100;
    res.json({ count: nums.length, max, min, avg });
  } catch (err) {
    console.error('DB error (stats):', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/sorted?by=percentage&order=desc
router.get('/sorted', async (req, res) => {
  try {
    const by = req.query.by === 'name' ? 'name' : 'percentage';
    const order = (req.query.order && req.query.order.toLowerCase() === 'asc') ? 'ASC' : 'DESC';
    const sql = `SELECT * FROM RollNoStudent ORDER BY ${by} ${order}`;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    console.error('DB error (sorted):', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
