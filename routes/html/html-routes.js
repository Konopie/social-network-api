const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/user-list.html'));
});

router.get('/add-user', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/add-user.html'));
});

router.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/user.html'));
});

module.exports = router;
