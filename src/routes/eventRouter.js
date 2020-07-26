const { Router } = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { getEvents, getEvent } = require('../services/eventService');

const { MONGO_URI, MONGO_DB_NAME } = process.env;
const router = Router();

router.get('/', async (req, res, next) => {
    let mongoDbClient;
    try {
        mongoDbClient = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true });
        const db = mongoDbClient.db(MONGO_DB_NAME);
        const response = await getEvents(db);
        await mongoDbClient.close();
        return res.json(response);
    } catch (error) {
        await mongoDbClient.close();
        return next(new Error(error));
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    let mongoDbClient;
    try {
        mongoDbClient = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true });
        const db = mongoDbClient.db(MONGO_DB_NAME);
        const response = await getEvent(db, +id);
        await mongoDbClient.close();
        return res.json(response);
    } catch (error) {
        await mongoDbClient.close();
        return next(new Error(error));
    }
});

module.exports = router;
