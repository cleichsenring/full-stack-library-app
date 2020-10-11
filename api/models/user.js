'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Course);
    }
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a value for 'firstName'"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a value for 'lastName' "
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      isEmail: true,
      validate: {
        notContains: '\\',
        notNull: {
          msg: "Please provide a value for 'emailAddress'"
        },
        isEmail: {
          msg: 'Please provide a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a value for 'password'"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    // Create index for emailAddress and ensure uniqueness https://sequelize.org/master/manual/indexes.html
    indexes: [{ unique: true, fields: ['emailAddress'] }]
  });
  return User;
};