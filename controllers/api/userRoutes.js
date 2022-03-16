const router = require('express').Router();
const {Post, User, Comment} = require('../../models');

// Create User
router.post('/', async (req, res) => {
    try {
        const userDbData = await User.create({
            username: req.body.userame,
            email: req.body.email,
            password: req.body.password
        })
        
        req.session.save(() => {
            req.session.loggedIn = true
            req.session.user_id - userDbData.id
            res.status(200).json(userDbData)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// User Log In
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
            username: req.body.email,
        },
    })
    
    if (!user) {
        res.status(400).json({ message: 'No user associated with that email!'})
        return
    }
    
    const validPassword = user.checkPassword(req.body.password);
    
    if (!validPassword) {
        res.status(400).json({ message: 'Sorry, that password is incorrect. Please try again.' });
        return
    }
    
    req.session.save(() => {
        req.session.userId = user.id
        req.session.username = user.name
        req.session.loggedIn = true
        
        
        res.status(200).json({ user: dbUserData, message: 'You are now logged in!' })
    })
    } catch (err) {
        res.status(400).json({ message : 'No user account found!'})
    }
})

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end()
      })
    } else {
      res.status(404).end()
    }
  })
  
  module.exports = router