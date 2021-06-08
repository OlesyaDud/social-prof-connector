const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Public  / api/users
router.post('/', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Email is required').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password is required').isLength({ min: 5 })
],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      res.send();
  // send data. excess data with req.body 
});


module.exports = router;