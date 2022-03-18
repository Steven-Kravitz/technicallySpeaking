const { Comment } = require('../models')

const commentData = [
    {
        comment: 'HTML, CSS, and Javascript go hand in hand!',
        post_id: 1,
        user_id: 1
    },
    {
        comment: 'I like React!',
        post_id: 2,
        user_id: 2
    },
    {
        comment: 'Thanks!',
        post_id: 3,
        user_id: 3
    },
    {
        comment: 'Looks good to me!',
        post_id: 4,
        user_id: 4
    }
]


const seedComments = () => Comment.bulkCreate(commentData)

module.exports = seedComments