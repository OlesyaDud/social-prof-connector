const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const Profile = require('../../model/Profile');
const Post = require('../../model/Post');
const config = require('config');


router.get('/myprofile',auth, async (req, res) =>  {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: "No profile found for this user"});    
        }
         // if there is a profile
            res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;