const express = require('express');
const getConnection = require('./database'); // Імпортуємо функцію для отримання з'єднання
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Конкретний домен
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
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

app.get('/lots', async (req, res) => {
  reqBody(res, `
    SELECT goods_for_sale.*, state.description as descriptionState, MAX(bids.rate) as rate, COUNT(bids.id_goods) as bids
    FROM goods_for_sale 
    LEFT JOIN bids ON goods_for_sale.id = bids.id_goods
    INNER JOIN state ON goods_for_sale.state = state.state
    WHERE goods_for_sale.category = "Аукціон" 
    GROUP BY goods_for_sale.id, state.description
  `);
})

app.get('/lot', async (req, res) => {
  const id = req.query.id;
  
  reqBody(res, `
    SELECT goods_for_sale.*, state.description as descriptionState, MAX(bids.rate) as rate, COUNT(bids.id_goods) as bids
    FROM goods_for_sale 
    LEFT JOIN bids ON goods_for_sale.id = bids.id_goods
    INNER JOIN state ON goods_for_sale.state = state.state
    WHERE goods_for_sale.id = ${id} 
    GROUP BY goods_for_sale.id, state.description
  `);
})

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
    const requestNumber = Date.now();
    const files = req.files;
    const fullName = req.body.fullName;
    const nameProduct = req.body.nameProduct;
    const type = req.body.type;
    const phone = parseInt(req.body.phone);
    const state = req.body.state;
    
    const connection = await getConnection();

    // Обробка кожного завантаженого файлу
    files.forEach(async (file) => {
      const { filename, path } = file;
      // Зберігаємо інформацію про файл в базу даних
      const [result] = await connection.query('INSERT INTO requests_for_evaluation (requestNumber, fullName, phone, nameProduct, state, filename, path, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [requestNumber, fullName, phone, nameProduct, state, filename, path, type]);
    });

    res.json({ success: true, message: 'Files uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ success: false, message: 'Error uploading files.' });
  }
});

app.post('/upAnte', async (req, res) => {
  try {
    const id = req.body.id;
    const rate = req.body.rate;
    const name = req.body.name;
    const email = req.body.email;
    const connection = await getConnection();

    const [result] = await connection.query(`
      INSERT INTO bids (id_goods, rate, name, email) 
      VALUES (?, ?, ?, ?)`, [id, rate, name, email]
    );

    res.json({ success: true, message: 'Files uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ success: false, message: 'Error uploading files.' });
  }
})

app.patch('/addViews', async (req, res) => {
  try {
    const id = req.body.id;
   
    const connection = await getConnection();

    const [result] = await connection.query(`
      UPDATE goods_for_sale
      SET views = views + 1
      WHERE id = ?`, [id]
    );

    res.json({ success: true, message: 'Files uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ success: false, message: 'Error uploading files.' });
  }
})

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