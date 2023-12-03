module.exports = (sequelize, DataTypes, Model) => {

    class User extends Model{
        getFarmerFullName(){
            return `${this.firstName} ${this.lastName}`;
        }
    };

    User.init({
        firstName: { 
            type: DataTypes.STRING,
            minLength: 3,
            maxLength: 50,
            validate: {
                isAlpha: {
                    args: true,
                    msg: 'Your first name must only contain letters'
                },
            }
        },

        agriCooperativeName: {
            type: DataTypes.STRING,
            minLength: 5,
            maxLength: 100,
        },

        lastName: {
            type: DataTypes.STRING,
            minLength: 3,
            maxLength: 50,
            validate: {
                isAlpha: {
                    args: true,
                    msg: 'Your last name must only contain letters'
                },
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 100,
            validate: {
                notNull: {
                    msg: 'Your email is required'
                },
                isEmail: {
                    args: true,
                    msg: 'Enter a valid email'
                }
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        gender: {
            type: DataTypes.STRING,
            default: 'male',
        },

        birthDate: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isBefore: '2004-01-01',
                isAfter: '1970-01-01'
            }
        },

        phone: {
            type: DataTypes.STRING,
        },
        
        district: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        role: {
            type: DataTypes.STRING,
            allowNull: false
        },

        profilePic: {
            type: DataTypes.STRING,
        }
    }, {sequelize, modelName: 'user'});

    return User;
}