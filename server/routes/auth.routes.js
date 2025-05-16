const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const router = express.Router();

const USERS_DATA_PATH = path.join(__dirname, '../data/users.json');

router.post('/register', async (req, res) => {
  try {
    const { username, password, fullname, email } = req.body;

    if (!username || !password || !fullname || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Все поля обязательны для заполнения' 
      });
    }

    const users = await fs.readJSON(USERS_DATA_PATH);

    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Пользователь с таким именем или email уже существует' 
      });
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
      username,
      password,
      fullname,
      email,
      avatarUrl: '/assets/images/default-avatar.jpg',
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await fs.writeJSON(USERS_DATA_PATH, users);

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      success: true,
      message: 'Пользователь успешно зарегистрирован',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при регистрации пользователя' 
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Необходимо указать имя пользователя и пароль' 
      });
    }

    const users = await fs.readJSON(USERS_DATA_PATH);

    const user = users.find(user => user.username === username && user.password === password);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Неверное имя пользователя или пароль' 
      });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      message: 'Вход выполнен успешно',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при входе в систему' 
    });
  }
});

router.get('/me', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Аутентификация пользователя',
      user: null
    });
  } catch (error) {
    console.error('Ошибка при проверке пользователя:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при проверке пользователя' 
    });
  }
});

module.exports = router; 