const express = require('express');
const app = express();
const port = 3001;
const getConnection = require('./database'); // Імпортуємо функцію для отримання з'єднання
const multer = require('multer');
const path = require('path');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Конкретний домен
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/metal_prices', async (req, res) => {
  reqBody(res, 'SELECT * FROM metal_prices')
});

app.get('/laptop_prices', async (req, res) => {
  reqBody(res, 'SELECT * FROM laptop_prices')
});

app.get('/monitor_prices', async (req, res) => {
  reqBody(res, 'SELECT * FROM monitor_prices')
});

app.get('/phone_prices', async (req, res) => {
  reqBody(res, 'SELECT * FROM phone_prices')
});

app.get('/photo_camera_prices', async (req, res) => {
  reqBody(res, 'SELECT * FROM photo_camera_prices')
});

app.get('/tablets_prices', async (req, res) => {
  reqBody(res, 'SELECT * FROM tablets_prices')
});

app.get('/tv_prices', async (req, res) => {
  reqBody(res, 'SELECT * FROM tv_prices')
});

app.get('/video_camera_prices', async (req, res) => {
  reqBody(res, 'SELECT * FROM video_camera_prices')
});

app.get('/state', async (req, res) => {
  reqBody(res, 'SELECT * FROM state')
});

const storage = multer.diskStorage({
  destination: 'server/uploads/', // директорія, де будуть зберігатися файли
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Обробник маршруту для завантаження файлів
app.post('/upload', upload.array('images', 2), async (req, res) => {
  try {
    const files = req.files;
    const fullName = req.body.fullName;
    const nameProduct = req.body.nameProduct;
    const phone = parseInt(req.body.phone);
    console.log(files)
    const connection = await getConnection();

    // Обробка кожного завантаженого файлу
    files.forEach(async (file) => {
      const { filename, path } = file;
      // Зберігаємо інформацію про файл в базу даних
      const [result] = await connection.query('INSERT INTO applicationsForWatch (fullName, phone, nameProduct, filename, path) VALUES (?, ?, ?, ?, ?)', [fullName, phone, nameProduct, filename, path]);
    });

    res.json({ success: true, message: 'Files uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ success: false, message: 'Error uploading files.' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});

async function reqBody(res, SQLreq) {
  try {
    const connection = await getConnection();
    const [rows, fields] = await connection.execute(SQLreq);
    res.json(rows);
  } catch (error) {
    console.error('Помилка запиту до бази даних:', error);
    res.status(500).send('Помилка сервера');
  }
}