const _fetchDocumentById = async (db, collection, _id) =>
    (await db.collection(collection).findOne({ _id }, { projection: { _id: 0}}));

const _fetchEventCreatorLocation = async (db, event) => {
    const user = await _fetchDocumentById(db, 'users', event.creator);
    const location = await _fetchDocumentById(db, 'locations', event.locationId);
    if (user) {
        event.creator = user;
    } else {
        delete event.creator;
    }
    if (location) {
        event.location = location;
    }
    delete event.locationId;
};

const getEvents = async db => {
    const events = await db.collection('events').find({}, { projection: {_id: 0, comments: 0, guests: 0}}).toArray();

    for (const event of events) {
        await _fetchEventCreatorLocation(db, event);
    }
    return events;
};

const getEvent = async (db, id) => {
    const event = await db.collection('events').findOne({ id }, { projection: { _id: 0}});
    await _fetchEventCreatorLocation(db, event);
    const guests = [...event.guests];
    event.guests = [];
    for (const guest of guests) {
        const user = await _fetchDocumentById(db, 'users', guest);
        if (user) {
            event.guests.push(user);
        }
    }
    const comments = [...event.comments];
    event.comments = [];
    for (let j = 0; j < comments.length; j++) {
        const comment = await _fetchDocumentById(db, 'comments', comments[j]);
        if (comment) {
            const user = await _fetchDocumentById(db, 'users', comment.user);
            if (user) {
                comment.user = user;
                event.comments.push(comment);
            }
        }
    }
    return event;
};

module.exports = {
    getEvents,
    getEvent
};
