// backend/routes/api/session.js
const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();



const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];


// Log in
router.post('/', validateLogin, async (req, res, next) => {

    const { credential, password } = req.body

    let user = await User.login({ credential, password })

    if (!credential || !password) {
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "credential": "Email or username is required",
                "password": "Password is required"
            }
        })
    }

    if (!user) {
        res.status(401)
        return res.json({
            "message": "Invalid credentials",
            "statusCode": 401
        })
    }
    const token = await setTokenCookie(res, user)
    user = user.toJSON()
    user.token = token

    return res.json(user)
})


// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' })
})


// Restore  user
router.get('/', [restoreUser, requireAuth], async (req, res) => {
    const { user } = req

    if (user) {
        return res.json(
            user.toSafeObject()
        )
    } else {
        res.status(401)
        return res.json({
            message: "Authentication required",
            statusCode: 401
        })
    }
})




module.exports = router;
