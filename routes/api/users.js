const express = require('express');
const router = express.Router();

// Public  / api/users
router.get('/', (req, res) => res.send('User route'));

module.exports = router;