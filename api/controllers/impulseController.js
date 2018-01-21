'use strict';
var impulseModel = require('../models/impulseModel');

// GET /api/impulse
exports.get_turn_impulse = function(req, res) {
    res.json(impulseModel.ImpulseManager);
};
// POST /api/impulse
exports.set_turn_impulse = function(req, res) {
    var turnImpulse = req.body;
    var turn = impulseModel.ImpulseManager.turn;
    var impulse = impulseModel.ImpulseManager.impulse;
    if (turnImpulse.turn !== undefined && turnImpulse.turn !== null) {
        if (turnImpulse.turn >= 1) {
            turn = turnImpulse.turn;
        } else {
            res.status(400).send({error:"turn must be >= 1"});
            return;
        }
    }

    if (turnImpulse.impulse !== undefined && turnImpulse.impulse !== null) {
        if (turnImpulse.impulse >= 0 && turnImpulse.impulse <= 32) {
            impulse = turnImpulse.impulse;
        } else {
            res.status(400).send({error:"impulse must be 0 <= impulse <= 32"});
            return;
        }
    }

    impulseModel.ImpulseManager.turn = turn;
    impulseModel.ImpulseManager.impulse = impulse;

    res.json(impulseModel.ImpulseManager);
};

// PUT /api/impulse/next
exports.increment_impulse = function(req, res) {
    var impulse = impulseModel.ImpulseManager.impulse;
    var turn = impulseModel.ImpulseManager.turn;

    impulse++;

    if (impulse > 32) {
        turn++;
        impulse = 0;
    }
    impulseModel.ImpulseManager.impulse = impulse;
    impulseModel.ImpulseManager.turn = turn;

    res.json(impulseModel.ImpulseManager);
};

// GET /api/impulse/moves
exports.get_moves_in_impulse = function(req, res) {
    impulseModel.ImpulseManager.impulse
    res.json(impulseModel.ImpulseChart[impulseModel.ImpulseManager.impulse]);
};

// GET /api/impulse/moves/:impulseNum
exports.get_moves_in_impulse_num = function(req, res) {
    var impulseNum = req.params.impulseNum;
    var impulse = impulseModel.ImpulseChart[impulseNum];
    res.json(impulse);
};

// GET /api/units
exports.get_units = function(req, res) {
    res.json(impulseModel.UnitList.values());
};

function updateUnit(unit, updates) {
    if (updates.name !== undefined && updates.name !== null) {
        unit.name = updates.name
    }
    if (updates.speed !== undefined && updates.speed !== null) {
        unit.speed = updates.speed
    }
    if (updates.race !== undefined && updates.race !== null) {
        unit.race = updates.race
    }
    if (updates.type !== undefined && updates.type !== null) {
        unit.type = updates.type
    }
    return unit;
}

// GET /api/units/:unitId
exports.get_a_unit = function(req, res) {
    var unitId = req.params.unitId;
    res.json(impulseModel.UnitList.get(unitId));
};
// POST /api/units/:unitId
exports.create_a_unit = function(req, res) {
    var unitId = req.params.unitId;
    var unitDetails = req.body;
    var unit;
    if (impulseModel.UnitList.has(unitId)) {
        unit = impulseModel.UnitList.get(unitId);
    } else {
        unit = new impulseModel.Unit(unitId);
    }

    unit = updateUnit(unit,unitDetails);

    impulseModel.UnitList.set(unitId,unit)
    res.json(unit);
};

// DELETE /api/units/:unitId
exports.delete_a_unit = function(req, res) {
    var unitId = req.params.unitId;
    impulseModel.UnitList.delete(unitId)
};


// GET /api/battle
exports.get_battle = function(req, res) {
    res.json(impulseModel.BattleManager);
};

// POST /api/battle
exports.set_battle = function(req, res) {
    var battleYear = req.body;
    var battle = impulseModel.BattleManager.title;
    var year = impulseModel.BattleManager.year;
    if (battleYear.title !== undefined && battleYear.title !== null) {
        battle = battleYear.title;
    }

    if (battleYear.year !== undefined && battleYear.year !== null) {
        year = battleYear.year;
    }

    impulseModel.BattleManager.title = battle;
    impulseModel.BattleManager.year = year;

    res.json(impulseModel.BattleManager);
};