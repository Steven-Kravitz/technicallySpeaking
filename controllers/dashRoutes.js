const router = require('express').Router()
const {Post, User, Comment} = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
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
        res.render('dashboard', {posts, loggedIn: req.session.loggedIn})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})


router.get('/edit/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
            model: Comment,
            attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
    }) .then (postDbData => {
        if(!postDbData) {
            res.status(404).json({ message: 'No post found with this id!' })
            return
        }
        const post = postDbData.get({plain: true})

        res.render('edit', {post, loggedIn: req.session.loggedIn})
    }) .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})


module.exports = router