const { Model, DataTypes, STRING } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model { // Defines User as a class building from the Model framework in Sequelize
    checkPassword(loginPw) { // Creates function checkPassword that intakes a login password
      return bcrypt.compareSync(loginPw, this.password); // returns the result of bcrypt's built in compare feature
    }
}

User.init( // Initializes the User class to take in dev input for it's structure
    { // A User has an ID, Name, Email, and Password.
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true //System Generated
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true //Must be email format
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 20] // Between 8 and 20 characters
            }
        }
    
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10) // hash the password with a salt level of 10
                // console.log(newUserData)
                return newUserData // return newly hashed password
            }
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User