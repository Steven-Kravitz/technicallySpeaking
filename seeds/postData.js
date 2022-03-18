const { Post } = require('../models')

const postData = [
    {
        title: 'Elden Ring Gameplay',
        post: 'This game is great!!',
        user_id: 1
    },
    {
        title: 'Ryzen vs AMD',
        post: 'Both are solid, but I prefer Ryzen',
        user_id: 2
    },
    {
        title: 'Audio Issues',
        post: 'My headphone port is scratchy',
        user_id: 3
    },
    {
        title: 'Beautify',
        post: 'This reformatting tool is phenomenal!',
        user_id: 4
    }
]

const seedPosts = () => Post.bulkCreate(postData)

module.exports = seedPosts