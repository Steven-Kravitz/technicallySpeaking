const router = require('express').Router()
const {Post, User, Comment} = require('../models')


router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
      
    }).then(postDbData => {
        const posts = postDbData.map((post) => post.get({ plain: true }))
        res.render('home', {posts, loggedIn: req.session.loggedIn})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('/post/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post', 'created_at'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
    }) .then (postDbData => {
        if(!postDbData) {
            res.status(404).json({ message: 'No post found with this id!' })
            return;
        }
        const post = postDbData.get({plain: true})

        res.render('view', {post, loggedIn: req.session.loggedIn})
    }) .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/')
      return
    }
  
    res.render('login')
})


module.exports = router