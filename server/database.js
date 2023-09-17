const mysql = require('mysql2');

// Налаштування підключення до бази даних
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pawnshop'
});

// Підключення до бази даних
connection.connect((err) => {
    if (err) {
        console.error('Помилка підключення до бази даних:', err);
    } else {
        console.log('Підключено до бази даних MySQL');
    }
});

module.exports = connection;