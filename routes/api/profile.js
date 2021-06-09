const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const Profile = require('../../model/Profile');
const Post = require('../../model/Post');
const config = require('config');
const { body, validationResult } = require('express-validator');


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

// Create or Update user profle --Private
router.post('/', [auth, [
    body('status', 'Status is required').not().isEmpty(),
    body('skills', 'Skills is required ').not().isEmpty()
]], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }

       // destructure the request
       const {
        company,
        website,
        skills,
        location,
        bio,
        status,
        githubusername,
        youtube,
        telegram,
        linkedin
      } = req.body;

      const profileFields = {};
      profileFields.user = req.user.id;
      if(company) profileFields.company = company;
      if(website) profileFields.website = website;
      if(location) profileFields.location = location;
      if(bio) profileFields.bio = bio;
      if(status) profileFields.status = status;
      if(githubusername) profileFields.githubusername = githubusername;
      if(skills) {
        //   turning into array --split converts strings into array separated by comma
          profileFields.skills = skills.split(',').map(skill => skill.trim());   
      }
      profileFields.social = {}
      if(youtube) profileFields.social.youtube = youtube;
      if(telegram) profileFields.social.telegram = telegram;
      if(linkedin) profileFields.social.linkedin = linkedin;

        console.log(profileFields.skills);
        
        try {
            let profile = await Profile.findOne({user: req.user._id});

            // update
            if(profile) {
                profile = await Profile.findByIdAndUpdate(
                {user: req.user._id}, 
                {$set: profileFields},
                {new: true});

                return res.json(profile);
            }

            // not found , create profile
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
      }
);

// Get All Profiles 
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Get Profile By Id
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);

        if(!profile) return res.status(400).json({msg: "No profile for this user"});

        res.json(profile);
    } catch (error) {
        console.error(error.message);

        if(error.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
});

// Delete profile
router.delete('/', auth, async (req, res) => {
    try {

        // remove profile
       await Profile.findOneAndRemove({user: req.user.id});
        // remove user
       await User.findOneAndRemove({ _id: req.user.id});

        res.json({msg: 'User removed'});
    } catch (error) {
        console.error(error.message);

        if(error.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
});



module.exports = router;