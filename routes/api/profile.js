const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const Profile = require('../../model/Profile');
const request = require('request');
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


// PUT profile experience
router.put('/experience', [auth, [
    body('title', 'Title is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {
        title, company, location, description, from, to, current
    } = req.body;

    // title---same as title: title
    const newExp = {
        title, company, location, description, from, to, current
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// delete experience
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        // get correct exp to remove
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        // want to take something out
        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// PUT profile education
router.put('/education', [auth, [
    body('school', 'School is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {
       school, degree, fieldofstudy, description, from, to, current
    } = req.body;

    // title---same as title: title
    const newEdu = {
        school, degree, fieldofstudy, description, from, to, current
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// delete education
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        // get correct exp to remove
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        // want to take something out
        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// get user repost from GitHub
router.get('/github/:username', (req, res) => {
    try {
       const options = {
           uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
           method: 'GET',
           headers: {'user-agent': 'node.js'}
       };

       request(options, (error, response, body) => {
        if(error) console.error(error);

        if(response.statusCode !== 200) {
            return res.status(404).json({msg: 'No github profile found'});
        }

        // if it is found
        res.json(JSON.parse(body));
       });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error'); 
    }
})

module.exports = router;