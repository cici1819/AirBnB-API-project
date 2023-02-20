
const router = require('express').Router();
const { googleMapsApiKey } = require('../../config');

router.post('/key', (req, res) => {
    res.json({ googleMapsApiKey });
});

module.exports = router;
