'use strict';
module.exports = function(app) {
    var impulseControl = require('../controllers/impulseController');

    // impulse Routes
    app.route('/api/impulse')
        .get(impulseControl.get_turn_impulse)
        .post(impulseControl.set_turn_impulse);

    app.route('/api/impulse/next')
        .put(impulseControl.increment_impulse);

    app.route('/api/impulse/moves')
        .get(impulseControl.get_moves_in_impulse);

    app.route('/api/impulse/moves/:impulseNum')
        .get(impulseControl.get_moves_in_impulse_num);

    app.route('/api/impulse/units')
        .get(impulseControl.get_units);

    app.route('/api/impulse/units/:unitId')
        .get(impulseControl.get_a_unit)
        .put(impulseControl.update_a_unit)
        .delete(impulseControl.delete_a_unit);

    app.route('/api/battle')
        .get(impulseControl.get_battle)
        .post(impulseControl.set_battle);

};
