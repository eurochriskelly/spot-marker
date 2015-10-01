'use strict';

var should = require('should');
var module = require('./index');

describe('Test spot marker functionality', function () {
    
    it('Can add some points', function (done) {
        var id1 = helper.addPointToDatabase();
        var id2 = helper.addPointToDatabase();
        done();
    });

    it('creates point and adds historical entries', function (done) {
        var id = helper.addPointToDatabase();

        module.addMarkEra(id, {
            lat: 34,
            lon: -45
        });
        
        module.addMarkEra(id, {
            lat: 14,
            lon: -125
        });

        module.getSpotMark(id).positionTrack.length.should.equal(3);
        done();
    });
});


var helper = function () {

    return {
        addPointToDatabase : addPointToDatabase
    };

    // ---
    function addPointToDatabase () {
        var m1 = {
            lat : 33,
            lon : 44
        };

        // create new mark which shall change over time
        var id = module.createMark(m1);
        id.length.should.greaterThan(6);

        // retrive mark from database
        var sm = module.getSpotMark(id);
        sm.dirty.should.equal(true);
        return id;
    }    
    
}();
