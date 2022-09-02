// backend/routes/api/users.js
const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");




// Sign up

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    if(!username || !email){
      return res.status(400).json({
          "message": "Validation error",
          "statusCode": 400,
          "errors": {
            "email": "Invalid email",
            "username": "Username is required",
            "firstName": "First Name is required",
            "lastName": "Last Name is required"
          }
      })
  }
    const sameName = await User.findOne({ where: { email } });
    if (sameName) {
      res.status(403).json({
        "message": "Forbidden, User already exits",
        "statusCode":403,
        "errors": {
          "email": "User with that email already exits"
      }
      })
    }
    const sameEmail = await User.findOne({ where: { username } });
    if (sameEmail) {
      res.status(403).json({
        "message": "Forbidden, User already exists",
        "statusCode":403,
        "errors": {
          "username": "User with that username already exits"
      }
      })
    }
    let user = await User.signup({ firstName,lastName,email, username, password });
    const token = await setTokenCookie(res, user);
    user = user.toJSON();
    user.token = token;

    return res.json(
      user

    )
  }
);

module.exports = router;
