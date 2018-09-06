const express = require('express');

const router = express.Router({});
const fs = require('fs');
const { parseEvents, sortEvents } = require('../helpers/csvEvents');

/* GET events */
router.get('/', (req, res) => {
  const jsonQuery = JSON.parse(req.query.query);
  fs.readFile('./data/events.csv', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const jsonEvents = parseEvents(data);
      const results = sortEvents(jsonQuery, jsonEvents);
      res.send(results);
    }
  });
});

module.exports = router;
