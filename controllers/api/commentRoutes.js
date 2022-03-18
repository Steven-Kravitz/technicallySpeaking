// WORK ON COMMENT ROUTES NEXT THEN INDEX THEN DASH/HOME THEN INDEX
const router = require('express').Router()
const {Comment} = require('../../models')
const withAuth = require('../../utils/auth')

router.get('/', (req,res) => {
    Comment.findAll({
    })
        .then(commentDbData => res.json(commentDbData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.post('/', withAuth, (req, res) => {
    Comment.create({
        comment: req.body.comment,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    }) 
    .then(commentDbData => res.json(commentDbData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(commentDbData => {
        if(!commentDbData) {
            res.status(404).json({ message: 'No comment associated with this id!' })
            return
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router