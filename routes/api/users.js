const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../../model/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Register a user
// Public  / api/users
router.post('/', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Email is required').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password is required').isLength({ min: 5 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    try {
       // See if userbexists
       let user = await User.findOne({email: email});

       if(!user) {
           return res.status(400).json({ errors: [{msg: 'User already exists'}]});
       }
        // If user does not exist , Get user's gravatar
       const avatar = gravatar.url(email,  {
           s: '200',
           r: 'pg',
           d: 'mm'
       })

       user = new User({name, email, avatar, password});
        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();
        // Return jsonwebtoken 
       const payload = {
           user: {
               id: user.id
           }
       }

       jwt.sign(payload, config.get('jwtSecret'), 
       {expiresIn: 36000 }, (error, token)=> {
            if(error) throw error;
            res.json({token});
       });
 
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }     
  // send data. excess data with req.body 
});

module.exports = router;