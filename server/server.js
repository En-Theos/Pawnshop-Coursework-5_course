const express = require('express');
const app = express();
const port = 3001;
const db = require('./database'); // Імпортуємо модуль для підключення до бази даних

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Конкретний домен
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

app.get('/metal_prices', (req, res) => {
  // Виконуємо запит до бази даних
  db.query('SELECT * FROM metal_prices', (err, results) => {
    if (err) {
      console.error('Помилка запиту до бази даних:', err);
      res.status(500).send('Помилка сервера');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});





