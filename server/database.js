const mysql = require('mysql2');

// Налаштування пула з'єднань до бази даних
const pool = mysql.createPool({
  connectionLimit: 10, // Максимальна кількість з'єднань у пулі
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pawnshop'
});

// Замість connection.connect() ми використовуємо pool.promise() для отримання з'єднання
// Ми використовуємо async/await для асинхронного виконання запитів
const getConnection = async () => {
  return pool.promise();
};

module.exports = getConnection;