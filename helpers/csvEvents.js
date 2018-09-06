/* eslint-disable no-param-reassign */
const { haversine } = require('../helpers/math');

function setImpressions(closest, event, results) {
  if (typeof results[closest.name] === 'undefined') {
    return event.event_type === 'imp' ? 1 : 0;
  }
  return results[closest.name].impressions += event.event_type === 'imp' ? 1 : 0;
}

function setClicks(closest, event, results) {
  if (typeof results[closest.name] === 'undefined') {
    return event.event_type === 'click' ? 1 : 0;
  }
  return results[closest.name].clicks += event.event_type === 'click' ? 1 : 0;
}

const csvEvents = {
  parseEvents: (data) => {
    const splitData = data.split('\n');
    splitData.shift();
    const mapData = splitData.map((line) => {
      const splitLine = line.split(',');
      return {
        lat: splitLine[0],
        lng: splitLine[1],
        event_type: splitLine[2],
      };
    });
    return JSON.parse(JSON.stringify(mapData));
  },
  sortEvents: (jsonQuery, jsonEvents) => {
    const results = {};
    Object.values(jsonEvents)
      .forEach((event) => {
        const closest = jsonQuery
          .reduce((min, p) => {
            if (haversine(p, event) < min.d) min.point = p;
            return min;
          }, {
            point: jsonQuery[0],
            d: haversine(jsonQuery[0], event),
          }).point;
        results[closest.name] = {
          lat: closest.lat,
          lon: closest.lon,
          impressions: setImpressions(closest, event, results),
          clicks: setClicks(closest, event, results),
        };
      });
    return results;
  },
};

module.exports = csvEvents;
