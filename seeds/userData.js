const { User } = require('../models')

const userData = [
    {
        username: 'tomtom',
        email: 'tom@tom.com',
        password: 'tommy234'
    },
    {
        username: 'limlom',
        email: 'liam@liam.com',
        password: 'limlom26'
    },
    {
        username: 'Socs',
        email: 'Soc@rus.com',
        password: 'Password88'
    },
    {
        username: 'Croonch',
        email: 'Blair@Blair.com',
        password: 'MaggieCosmos'
    },
]

const seedUsers = () => User.bulkCreate(Userdata)

module.exports = seedUsers