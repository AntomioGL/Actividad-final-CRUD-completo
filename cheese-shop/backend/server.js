
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
  db.run(\`CREATE TABLE IF NOT EXISTS cheese (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    price REAL
  )\`);
});

app.get('/cheeses', (req, res) => {
  db.all('SELECT * FROM cheese', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post('/cheeses', (req, res) => {
  const { name, type, price } = req.body;
  db.run('INSERT INTO cheese (name, type, price) VALUES (?, ?, ?)',
    [name, type, price],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    });
});

app.put('/cheeses/:id', (req, res) => {
  const { name, type, price } = req.body;
  const { id } = req.params;
  db.run('UPDATE cheese SET name = ?, type = ?, price = ? WHERE id = ?',
    [name, type, price, id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.sendStatus(200);
    });
});

app.delete('/cheeses/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM cheese WHERE id = ?', id, function (err) {
    if (err) return res.status(500).json(err);
    res.sendStatus(200);
  });
});

app.listen(port, () => console.log(\`Backend running on http://localhost:\${port}\`));
