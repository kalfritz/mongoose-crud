const express = require('express');
const router = express.Router();
const Ninja = require('../db/ninja_model');

router.get('/ninjas', (req, res, next) => {
  let { lng, lat } = req.query;

  Ninja.aggregate()
    .near({
      near: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)],
      },
      maxDistance: 100000,
      spherical: true,
      distanceField: 'dis',
    })
    .then(result => res.send(result))
    .catch(next);
});

router.get('/ninjas/:id', (req, res, next) => {
  const { id } = req.params;
  Ninja.findOne({ _id: id })
    .then(result => res.send(result))
    .catch(next);
});

router.post('/ninjas', (req, res, next) => {
  Ninja.create(req.body)
    .then(result => res.send(result))
    .catch(next);
});

router.put('/ninjas/:id', (req, res, next) => {
  let { id } = req.params;
  Ninja.findByIdAndUpdate({ _id: id }, req.body)
    .then(() => Ninja.findOne({ _id: id }))
    .then(result => res.send(result))
    .catch(next);
});

router.delete('/ninjas/:id', (req, res, next) => {
  let { id } = req.params;
  Ninja.findByIdAndRemove({ _id: id })
    .then(result => res.send(result))
    .catch(err => next(err));
});

module.exports = router;
