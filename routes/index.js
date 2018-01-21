var express = require('express');
var router = express.Router();
var impulseModel = require('../api/models/impulseModel');
var impulseController = require('../api/controllers/impulseController');

/* GET home page. */
router.get('/', function(req, res, next) {
  var state = { title: impulseModel.BattleManager.title,
    turn: impulseModel.ImpulseManager.turn,
    impulse: impulseModel.ImpulseManager.impulse,
    status: impulseModel.ImpulseManager.impulse === 0 ? 'Energy Allocation Phase' : 'Impulse Procedure',
    moves: impulseModel.ImpulseChart[impulseModel.ImpulseManager.impulse],
    speeds: impulseModel.ImpulseChart[32],
    movingUnits: impulseController.getUnitsMovingInImpulse(impulseModel.ImpulseManager.impulse)
  };
  res.render('index', state);
});

module.exports = router;
