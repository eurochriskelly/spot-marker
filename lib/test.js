'use strict';

var should = require('should');
var module = require('./index');

describe('Test spot marker functionality', function () {
    
    it('Can add some points', function (done) {
        var id1 = testImpl.addPointToDatabase();
        var id2 = testImpl.addPointToDatabase();
        done();
    });

    it('creates point and adds historical entries', function (done) {
        var id = testImpl.addPointToDatabase();

        module.addMarkEra(id, testImpl.marks[0]);        
        module.addMarkEra(id, testImpl.marks[1]);

        module.getSpotMark(id).positionTrack.length.should.equal(3);
        done();
    });

    it('can create multiple points with varying history', function (done) {
        var spotData = testImpl.addManyPoints();
        console.log(JSON.stringify(spotData));
        done();
    });
});

/// TEST IMPLEMENTATION DETAILS
var testImpl = function () {
    // implementation details
    var marks, spotData;
    
    activate();
    return {
        marks : marks,
        spotData : spotData,
        addPointToDatabase : addPointToDatabase,
        addManyPoints : addManyPoints
    };

    // ---
    function addManyPoints () {
        spotData.forEach(function (sd) {
            var thisId = module.createMark(sd[0]);
            sd.slice(1).forEach(function (s) {
                module.addMarkEra(thisId, s);
            });
        });
        return module.getSpotData();
    }
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
    function activate() {
        marks = [{ lat: 34, lon: -45 }, { lat: -134, lon: 45 }];
        spotData = [
            [
                { lon : -28, lat : -10, epoch : 2800 },
                { lon : -30, lat : -12, epoch : 2000 },
                { lon : -35, lat : -15, epoch : -100 },
                { lon : -38, lat : -18, epoch : -600 }
            ],
            [
                { lon : 2, lat : 25, epoch : 2000 },
                { lon : 20, lat : 35, epoch : -1000 },
                { lon : 5, lat : 1, epoch : -2000 },
                { lon : 5, lat : 1, epoch : -8000 },
                { lon : 50, lat : -31, epoch : -12000 }
            ]
        ];
    }
    
}();
