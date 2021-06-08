const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


// protected route
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// User Login/Authentication
router.post('/',
    body('email', 'Email is required').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password is required').exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
       // See if user exists
       let user = await User.findOne({email: email});

       if(!user) {
           return res
           .status(400)
        //    there is no user
           .json({ errors: [{msg: 'Invalid Credentials'}]});
       }

    //    match email and passord
       const isMatch = await bcrypt.compare(password, user.password);
 
       if(!isMatch) {
        return res
        .status(400)
        // password is wrong
        .json({ errors: [{msg: 'Invalid Credentials'}]});
       }
        // Return jsonwebtoken 
        // we have the user, setting the id
       const payload = {
           user: {
               id: user.id
           }
       }

       jwt.sign(
           payload, 
           config.get('jwtSecret'), 
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