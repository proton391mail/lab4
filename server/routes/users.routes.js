const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const router = express.Router();

const USERS_DATA_PATH = path.join(__dirname, '../data/users.json');
const FRIENDS_DATA_PATH = path.join(__dirname, '../data/friends.json');

router.get('/', async (req, res) => {
  try {
    const users = await fs.readJSON(USERS_DATA_PATH);
    
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json({
      success: true,
      users: usersWithoutPasswords
    });
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при получении пользователей' 
    });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await fs.readJSON(USERS_DATA_PATH);
    
    const user = users.find(user => user.id === parseInt(userId));
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при получении пользователя' 
    });
  }
});

router.get('/:userId/friends', async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await fs.readJSON(USERS_DATA_PATH);
    const friendsData = await fs.readJSON(FRIENDS_DATA_PATH);
    
    const userExists = users.some(user => user.id === parseInt(userId));
    if (!userExists) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    const userFriendships = friendsData.filter(
      friendship => friendship.userId === parseInt(userId) || friendship.friendId === parseInt(userId)
    );

    const friendIds = userFriendships.map(friendship => 
      friendship.userId === parseInt(userId) ? friendship.friendId : friendship.userId
    );

    const friends = users
      .filter(user => friendIds.includes(user.id))
      .map(friend => {
        const { password, ...friendWithoutPassword } = friend;
        return friendWithoutPassword;
      });

    res.json({
      success: true,
      friends
    });
  } catch (error) {
    console.error('Ошибка при получении друзей:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при получении друзей' 
    });
  }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const users = await fs.readJSON(USERS_DATA_PATH);
    const friendsData = await fs.readJSON(FRIENDS_DATA_PATH);
    
    const user = users.find(user => user.id === parseInt(userId));
    const friend = users.find(user => user.id === parseInt(friendId));
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }
    
    if (!friend) {
      return res.status(404).json({ 
        success: false, 
        message: 'Друг не найден' 
      });
    }

    if (parseInt(userId) === parseInt(friendId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Нельзя добавить себя в друзья' 
      });
    }

    const friendshipExists = friendsData.some(
      friendship => 
        (friendship.userId === parseInt(userId) && friendship.friendId === parseInt(friendId)) ||
        (friendship.userId === parseInt(friendId) && friendship.friendId === parseInt(userId))
    );

    if (friendshipExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'Этот пользователь уже в друзьях' 
      });
    }

    const newFriendship = {
      id: friendsData.length > 0 ? Math.max(...friendsData.map(f => f.id)) + 1 : 1,
      userId: parseInt(userId),
      friendId: parseInt(friendId),
      status: 'active',
      createdAt: new Date().toISOString()
    };

    friendsData.push(newFriendship);
    await fs.writeJSON(FRIENDS_DATA_PATH, friendsData);

    const { password, ...friendWithoutPassword } = friend;

    res.status(201).json({
      success: true,
      message: 'Друг успешно добавлен',
      friendship: newFriendship,
      friend: friendWithoutPassword
    });
  } catch (error) {
    console.error('Ошибка при добавлении друга:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при добавлении друга' 
    });
  }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const users = await fs.readJSON(USERS_DATA_PATH);
    const friendsData = await fs.readJSON(FRIENDS_DATA_PATH);
    
    const userExists = users.some(user => user.id === parseInt(userId));
    const friendExists = users.some(user => user.id === parseInt(friendId));
    
    if (!userExists) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }
    
    if (!friendExists) {
      return res.status(404).json({ 
        success: false, 
        message: 'Друг не найден' 
      });
    }

    const friendshipIndex = friendsData.findIndex(
      friendship => 
        (friendship.userId === parseInt(userId) && friendship.friendId === parseInt(friendId)) ||
        (friendship.userId === parseInt(friendId) && friendship.friendId === parseInt(userId))
    );

    if (friendshipIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Дружба не найдена' 
      });
    }

    friendsData.splice(friendshipIndex, 1);
    await fs.writeJSON(FRIENDS_DATA_PATH, friendsData);

    res.json({
      success: true,
      message: 'Друг успешно удален'
    });
  } catch (error) {
    console.error('Ошибка при удалении друга:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при удалении друга' 
    });
  }
});

module.exports = router; 