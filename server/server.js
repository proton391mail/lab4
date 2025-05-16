const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const DATA_DIR = path.join(__dirname, 'data');
const USERS_DATA_PATH = path.join(DATA_DIR, 'users.json');
const POSTS_DATA_PATH = path.join(DATA_DIR, 'posts.json');
const FRIENDS_DATA_PATH = path.join(DATA_DIR, 'friends.json');

const initializeData = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(USERS_DATA_PATH)) {
    fs.writeJSONSync(USERS_DATA_PATH, [
      {
        id: 1,
        username: 'admin',
        password: 'admin123',
        fullname: 'Администратор',
        email: 'admin@example.com',
        avatarUrl: '/assets/images/admin.jpg',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        username: 'user1',
        password: 'user123',
        fullname: 'Пользователь Тестовый',
        email: 'user1@example.com',
        avatarUrl: '/assets/images/user1.jpg',
        role: 'user',
        createdAt: new Date().toISOString()
      }
    ]);
  }

  if (!fs.existsSync(POSTS_DATA_PATH)) {
    fs.writeJSONSync(POSTS_DATA_PATH, [
      {
        id: 1,
        userId: 1,
        content: 'Добро пожаловать в Матрицу социальной сети!',
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: []
      }
    ]);
  }

  if (!fs.existsSync(FRIENDS_DATA_PATH)) {
    fs.writeJSONSync(FRIENDS_DATA_PATH, []);
  }

  console.log('Данные инициализированы');
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const authRouter = require('./routes/auth.routes');
const postsRouter = require('./routes/posts.routes');
const usersRouter = require('./routes/users.routes');

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

app.get('/api/status', (req, res) => {
  res.json({ status: 'Сервер успешно запущен', timestamp: new Date().toISOString() });
});

app.get('/api/admin-data', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Данные получены из админ-панели (матрицы)'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении данных из админ-панели'
    });
  }
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Матрица: Социальная сеть</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #000;
          color: #0f0;
          margin: 0;
          padding: 20px;
          line-height: 1.6;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          background-color: rgba(0, 20, 0, 0.7);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
        }
        h1 {
          color: #0f0;
          text-align: center;
          margin-bottom: 30px;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          margin-bottom: 10px;
          padding: 10px;
          background-color: rgba(0, 30, 0, 0.5);
          border-radius: 4px;
        }
        a {
          color: #0f0;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        code {
          background-color: #002000;
          padding: 2px 4px;
          border-radius: 3px;
        }
        .matrix-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.2;
          background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), 
                    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text y="0.9em" font-size="20" fill="green">010101110010110001001</text></svg>');
        }
      </style>
    </head>
    <body>
      <div class="matrix-bg"></div>
      <div class="container">
        <h1>Матрица: Социальная сеть</h1>
        <p>Сервер успешно запущен и готов к работе. Доступные API:</p>
        
        <h2>Доступные API:</h2>
        <ul>
          <li><a href="/api/status">/api/status</a> - Проверка статуса сервера</li>
          <li><a href="/api/admin-data">/api/admin-data</a> - Данные из админ-панели</li>
          <li><a href="/api/users">/api/users</a> - Список пользователей</li>
          <li><a href="/api/posts">/api/posts</a> - Список постов</li>
        </ul>
        
        <h2>Документация API:</h2>
        <p>Для подключения клиентского приложения используйте следующие эндпоинты:</p>
        
        <h3>Аутентификация:</h3>
        <ul>
          <li><code>POST /api/auth/register</code> - Регистрация нового пользователя</li>
          <li><code>POST /api/auth/login</code> - Вход в систему</li>
          <li><code>GET /api/auth/me</code> - Информация о текущем пользователе</li>
        </ul>
        
        <h3>Пользователи:</h3>
        <ul>
          <li><code>GET /api/users</code> - Список всех пользователей</li>
          <li><code>GET /api/users/:userId</code> - Информация о конкретном пользователе</li>
          <li><code>GET /api/users/:userId/friends</code> - Список друзей пользователя</li>
          <li><code>POST /api/users/:userId/friends/:friendId</code> - Добавить друга</li>
          <li><code>DELETE /api/users/:userId/friends/:friendId</code> - Удалить друга</li>
        </ul>
        
        <h3>Посты:</h3>
        <ul>
          <li><code>GET /api/posts</code> - Список всех постов</li>
          <li><code>POST /api/posts</code> - Создать новый пост</li>
          <li><code>GET /api/posts/user/:userId</code> - Посты конкретного пользователя</li>
          <li><code>POST /api/posts/:postId/comments</code> - Добавить комментарий к посту</li>
        </ul>
        
        <h3>WebSocket:</h3>
        <p>Для получения обновлений в реальном времени подключитесь к WebSocket:</p>
        <ul>
          <li><code>socket.emit('new-post', post)</code> - Отправка нового поста</li>
          <li><code>socket.on('feed-update', callback)</code> - Получение обновлений ленты</li>
          <li><code>socket.emit('send-message', message)</code> - Отправка сообщения</li>
          <li><code>socket.on('new-message', callback)</code> - Получение новых сообщений</li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.redirect('/');
  } else {
    res.status(404).json({ success: false, message: 'API endpoint not found' });
  }
});

io.on('connection', (socket) => {
  console.log('Новое WebSocket соединение:', socket.id);

  socket.on('new-post', (post) => {
    console.log('Получен новый пост:', post);
    io.emit('feed-update', post);
  });

  socket.on('send-message', (message) => {
    console.log('Новое сообщение:', message);
    io.emit('new-message', message);
  });

  socket.on('disconnect', () => {
    console.log('Клиент отключен:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  try {
    await initializeData();
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`URL для подключения: http://localhost:${PORT}`);
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
  }
});
