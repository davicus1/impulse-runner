'use strict';
var HashMap = require('hashmap');

var impulseManager = {
    turn: 1,
    impulse: 0
};

module.exports.ImpulseManager = impulseManager;

var battleManager = {
    title: "Skirmish",
    year: 160
};

module.exports.BattleManager = battleManager;

function unit(id) {
    this.name = "Unnamed";
    this.counter = id;
    this.speed = 0;
    this.race = "Generic";
    this.type = "Unknown";
    //TODO:Turn Mode? Will allow sorting move order
};


//Counter (id), unit
var unitList = new HashMap();

module.exports.Unit = unit;
module.exports.UnitList = unitList;

var impulseChart = [
      // 32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 4, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [ 5, 4, 4, 4, 4, 4, 4, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [ 6, 5, 5, 5, 5, 5, 0, 4, 4, 4, 4, 0, 0, 3, 3, 3, 3, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [ 7, 6, 6, 6, 6, 0, 5, 5, 5, 5, 0, 4, 4, 4, 0, 0, 0, 3, 3, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [ 8, 7, 7, 7, 7, 6, 6, 6, 6, 0, 5, 5, 5, 0, 4, 4, 4, 0, 0, 3, 3, 0, 0, 2, 2, 0, 0, 0, 1, 0, 0, 0],
        [ 9, 8, 8, 8, 0, 7, 7, 7, 0, 6, 6, 0, 0, 5, 5, 0, 0, 4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [10, 9, 9, 9, 8, 8, 8, 0, 7, 7, 0, 6, 6, 0, 0, 5, 5, 0, 4, 4, 0, 0, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0],
        [11,10,10, 0, 9, 9, 0, 8, 8, 0, 7, 7, 0, 6, 6, 0, 0, 5, 0, 0, 4, 0, 0, 3, 0, 0, 2, 0, 0, 1, 0, 0],
        [12,11,11,10,10,10, 9, 9, 9, 8, 8, 0, 7, 7, 0, 6, 6, 0, 5, 0, 0, 4, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        [13,12,12,11,11, 0,10,10, 0, 9, 0, 8, 8, 0, 7, 0, 0, 6, 0, 5, 0, 0, 4, 0, 0, 0, 0, 2, 0, 0, 0, 0],
        [14,13,13,12,12,11,11, 0,10,10, 9, 9, 0, 8, 0, 7, 7, 0, 6, 0, 5, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
        [15,14,14,13,13,12,12,11,11, 0,10, 0, 9, 0, 8, 0, 0, 7, 0, 6, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0],
        [16,15,15,14,14,13,13,12,12,11,11,10,10, 9, 9, 8, 8, 0, 7, 0, 6, 0, 5, 0, 4, 0, 3, 0, 2, 0, 1, 0],
        [17,16, 0,15, 0,14, 0,13, 0,12, 0,11, 0,10, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [18,17,16,16,15,15,14,14,13, 0,12, 0,11, 0,10, 0, 9, 8, 0, 7, 0, 6, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
        [19,18,17,17,16,16,15, 0,14,13,13,12, 0,11, 0,10, 0, 0, 8, 0, 7, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
        [20,19,18,18,17, 0,16,15,15,14, 0,13,12, 0,11, 0,10, 9, 0, 8, 0, 0, 6, 0, 5, 0, 0, 3, 0, 0, 0, 0],
        [21,20,19,19,18,17,17,16, 0,15,14, 0,13,12, 0,11, 0, 0, 9, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [22,21,20, 0,19,18, 0,17,16, 0,15,14, 0,13,12, 0,11,10, 0, 0, 8, 0, 0, 6, 0, 0, 4, 0, 0, 2, 0, 0],
        [23,22,21,20,20,19,18, 0,17,16, 0,15,14, 0, 0,12, 0, 0,10, 9, 0, 0, 7, 0, 0, 5, 0, 0, 0, 0, 0, 0],
        [24,23,22,21,21,20,19,18,18,17,16, 0,15,14,13, 0,12,11, 0, 0, 9, 8, 0, 0, 6, 0, 0, 0, 3, 0, 0, 0],
        [25,24,23,22, 0,21,20,19, 0, 0,17,16, 0, 0,14,13, 0, 0, 0,10, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0],
        [26,25,24,23,22, 0,21,20,19,18, 0,17,16,15, 0, 0,13,12,11, 0, 0, 0, 8, 0, 0, 0, 0, 4, 0, 0, 0, 0],
        [27,26,25,24,23,22, 0,21,20,19,18, 0, 0,16,15,14, 0, 0, 0, 0,10, 9, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
        [28,27,26,25,24,23,22, 0,21,20,19,18,17, 0, 0, 0,14,13,12,11, 0, 0, 0, 0, 7, 6, 0, 0, 0, 0, 0, 0],
        [29,28,27,26,25,24,23,22, 0, 0, 0,19,18,17,16,15, 0, 0, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0],
        [30,29,28,27,26,25,24,23,22,21,20, 0, 0, 0, 0, 0,15,14,13,12,11,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [31,20,29,28,27,26,25,24,23,22,21,20,19,18,17,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
];

module.exports.ImpulseChart = impulseChart;