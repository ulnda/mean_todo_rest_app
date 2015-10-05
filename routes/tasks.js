var models  = require('../models');
var express = require('express');
var Sequelize = require('sequelize');
var router = express.Router();

router.get('/', function(req, res) {
  models.Task.findAll().then(function(tasks) {
    res.json(tasks)
  });
});

router.post('/', function(req, res, next) {
  models.Task.create({
    title: req.body.title,
    description: req.body.description
  }).then(function(task) {
    res.json(task);
  }).catch(catchError(Sequelize.ValidationError, handleSequelizeValidationError, 
    next));
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
      description: req.body.description,
    });
  }).then(function(task) {
    res.json(task);
  }).catch(catchError(TypeError, handleTypeError, next))
  .catch(catchError(Sequelize.ValidationError, handleSequelizeValidationError, 
    next));
});

router.delete('/:id', function(req, res, next) {
  models.Task.find(req.params.id).then(function(task) {
    return task.destroy();
  }).then(function(task) {
    res.json(task);
  }).catch(catchError(TypeError, handleTypeError, next))
});

function handleTypeError(next) {
  var err = new Error('Cannot find Task');
  err.status = 404;
  next(err);
}

function handleSequelizeValidationError(next) {
  var err = new Error('Cannot validate Task');
  err.status = 400;
  next(err); 
}

function catchError(type, fn, next) {
  return function(err) {
    if(!(err instanceof type)) throw err;
    return fn(next);
  };
}

module.exports = router;
