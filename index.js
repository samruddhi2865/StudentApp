// index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');
const api = require('./api');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes
app.use('/api', api);

// Serve home.html when accessing root "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // Test MySQL connection and print all students at startup
  try {
    const [rows] = await db.query('SELECT * FROM RollNoStudent');
    if (rows.length === 0) {
      console.log('⚠️  No records found in RollNoStudent table.');
      console.log('👉 Please insert sample data using MySQL Workbench or your SQL script.');
    } else {
      console.log('\n📋 All Students:');
      console.table(rows);
    }
  } catch (err) {
    console.error('❌ Error connecting to database or fetching records:', err.message);
  }
});
