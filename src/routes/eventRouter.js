const { Router } = require('express');
const { getEvents } = require('../services/eventService');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const response = await getEvents();
        return res.json(response);
    } catch (error) {
        return next(new Error(error));
    }
});

module.exports = router;
