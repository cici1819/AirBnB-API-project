'use strict';
const { check } = require('express-validator');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: 'CASCADE',
        hooks: true
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: 'CASCADE',
        hooks: true
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: 'CASCADE',
        hooks: true
      });
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId", as: 'Owner'
      });

    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        min: -90,
        max: 90
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        min: -180,
        max: 180
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT

    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,

      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
