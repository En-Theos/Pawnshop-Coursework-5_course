const express = require('express');
const app = express();
const port = 3001;
const getConnection = require('./database'); // Імпортуємо функцію для отримання з'єднання

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Конкретний домен
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/metal_prices', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows, fields] = await connection.execute('SELECT * FROM metal_prices');
    res.json(rows);
  } catch (error) {
    console.error('Помилка запиту до бази даних:', error);
    res.status(500).send('Помилка сервера');
  }
});

app.get('/state', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows, fields] = await connection.execute('SELECT * FROM state');
    res.json(rows);
  } catch (error) {
    console.error('Помилка запиту до бази даних:', error);
    res.status(500).send('Помилка сервера');
  }
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});