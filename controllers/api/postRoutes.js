const router = require('express').Router()
const {Post, User, Comment} = require('../../models')
const withAuth = require('../../utils/auth')

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        
        attributes: ['id', 'title', 'post', 'user_id', 'created_at'],
        order: [['created_at', 'ASC']],
        
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
      
    }).then(postDbData => res.json(postDbData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get('/:id', (req,res) => {
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
    }).then(postDbData => {
        if(!postDbData) {
            res.status(404).json({ message: 'No post associated with this id!' })
            return
        }
        res.json(postDbData)

    }) .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post: req.body.post,
        user_id: req.session.user_id
    }) .then(postDbData => res.json(postDbData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post('/', withAuth, async (req, res) => {
    const body = req.body
  
    try {
      const newPost = await Post.create({ ...body, user_id: req.session.user_id })
      res.json(newPost)
    } catch (err) {
      res.status(500).json(err)
    }
  })
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post: req.body.post
    },
    {
        where: {
            id: req.params.id
        }
    }).then (postDbData => {
        if(!postDbData) {
            res.status(404).json({ message: 'No post associated with this id! Please try another id.' })
            return
        } res.json(postDbData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })    
})

  
  router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }) .then (postDbData => {
        if(!postDbData) {
            res.status(404).json({ message: 'No post associated with this id! Please double check the id.' })
            return
        } res.json(postDbData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })    
})

module.exports = router