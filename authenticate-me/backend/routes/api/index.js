// backend/routes/api/index.js
const router = require("express").Router();
// const { restoreUser } = require("../../utils/auth.js");
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);



// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
// router.use(restoreUser);



// backend/routes/api/index.js
// ...



// backend/routes/api/index.js
// ...

// GET /api/set-token-cookie

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user });
});

// ...
// GET /api/restore-user


router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

// ...


// ...

// GET /api/require-auth

router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});


// ...
// backend/routes/api/index.js
// const router = require("express").Router();


// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null




module.exports = router;
