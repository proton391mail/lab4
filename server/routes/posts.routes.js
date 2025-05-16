const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const router = express.Router();

const POSTS_DATA_PATH = path.join(__dirname, '../data/posts.json');
const USERS_DATA_PATH = path.join(__dirname, '../data/users.json');

router.get('/', async (req, res) => {
  try {
    const posts = await fs.readJSON(POSTS_DATA_PATH);
    const users = await fs.readJSON(USERS_DATA_PATH);

    const postsWithAuthorInfo = posts.map(post => {
      const author = users.find(user => user.id === post.userId);
      const { password, ...authorInfo } = author || { 
        fullname: 'Неизвестный пользователь',
        avatarUrl: '/assets/images/default-avatar.jpg'
      };
      
      return {
        ...post,
        author: authorInfo
      };
    });

    postsWithAuthorInfo.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json({
      success: true,
      posts: postsWithAuthorInfo
    });
  } catch (error) {
    console.error('Ошибка при получении постов:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при получении постов' 
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID пользователя и содержание поста обязательны' 
      });
    }

    const posts = await fs.readJSON(POSTS_DATA_PATH);
    const users = await fs.readJSON(USERS_DATA_PATH);

    const authorExists = users.some(user => user.id === parseInt(userId));
    if (!authorExists) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    const newPost = {
      id: posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1,
      userId: parseInt(userId),
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };

    posts.push(newPost);
    await fs.writeJSON(POSTS_DATA_PATH, posts);

    const author = users.find(user => user.id === parseInt(userId));
    const { password, ...authorInfo } = author;

    res.status(201).json({
      success: true,
      message: 'Пост успешно создан',
      post: {
        ...newPost,
        author: authorInfo
      }
    });
  } catch (error) {
    console.error('Ошибка при создании поста:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при создании поста' 
    });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await fs.readJSON(POSTS_DATA_PATH);
    const users = await fs.readJSON(USERS_DATA_PATH);

    const author = users.find(user => user.id === parseInt(userId));
    if (!author) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    const userPosts = posts.filter(post => post.userId === parseInt(userId));

    const { password, ...authorInfo } = author;
    const postsWithAuthorInfo = userPosts.map(post => ({
      ...post,
      author: authorInfo
    }));

    postsWithAuthorInfo.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json({
      success: true,
      posts: postsWithAuthorInfo
    });
  } catch (error) {
    console.error('Ошибка при получении постов пользователя:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при получении постов пользователя' 
    });
  }
});

router.post('/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID пользователя и содержание комментария обязательны' 
      });
    }

    const posts = await fs.readJSON(POSTS_DATA_PATH);
    const users = await fs.readJSON(USERS_DATA_PATH);

    const postIndex = posts.findIndex(post => post.id === parseInt(postId));
    const user = users.find(user => user.id === parseInt(userId));

    if (postIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пост не найден' 
      });
    }

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    const newComment = {
      id: posts[postIndex].comments.length > 0 
        ? Math.max(...posts[postIndex].comments.map(comment => comment.id)) + 1 
        : 1,
      userId: parseInt(userId),
      content,
      createdAt: new Date().toISOString()
    };

    posts[postIndex].comments.push(newComment);
    await fs.writeJSON(POSTS_DATA_PATH, posts);

    const { password, ...authorInfo } = user;

    res.status(201).json({
      success: true,
      message: 'Комментарий успешно добавлен',
      comment: {
        ...newComment,
        author: authorInfo
      }
    });
  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при добавлении комментария' 
    });
  }
});

module.exports = router; 