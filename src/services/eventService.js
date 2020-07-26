const axios = require('axios');
const _get = require('lodash/get');

const getEvents = async () => {
    const { data } = await axios.get(`${process.env.DRINKS_API}/events`);
    if (!_get(data, '0')) {
        throw new Error('Missing response from server');
    }
    return data;
};

module.exports = {
    getEvents,
};
