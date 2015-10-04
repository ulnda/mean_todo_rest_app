var models  = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  models.Task.findAll().then(function(tasks) {
    res.json(tasks)
  });
});

router.post('/', function(req, res) {
  models.Task.create({
    title: req.body.title,
    description: req.body.description
  }).then(function(task) {
    res.json(task);
  });
});

router.get('/:id', function(req, res) {
  models.Task.find(req.params.id).then(function(task) {
    res.json(task || {});
  });
});

router.put('/:id', function(req, res, next) {
  models.Task.find(req.params.id).then(function(task) {
    return task.updateAttributes({
      title: req.body.title,
      description: req.body.description
    });
  }).then(function(task) {
    res.json(task);
  }).catch(function(err) {
    var err = new Error('Cannot find Task');
    err.status = 404;
    next(err);
  });
});

router.delete('/:id', function(req, res, next) {
  models.Task.find(req.params.id).then(function(task) {
    return task.destroy();
  }).then(function(task) {
    res.json(task);
  }).catch(function(err) {
    var err = new Error('Cannot find Task');
    err.status = 404;
    next(err);
  });
});

module.exports = router;
