var shortid = require('shortid');
var _ = require('lodash');

var SpotMarker = function () {
    "use strict";

    var SPOT_MARKS = [];
    
    return {
        createMark : createMark
        , addMarkEra : addMarkEra
        , getSpotMark : getSpotMark
        // not tested:
        , save : save
        , load : load
    };

    // -----
    function init (spec)  {
        // persistence functions provided (and tested) outside module
        _retrieve = spec.fnRetrieve;
        _saveOne = spec.fnSave;
    }
    function getSpotMark (id) {
        return _.findWhere(SPOT_MARKS, {id : id});
    }
    function save (callback) {
        // save all items with dirty flag set
        var remaining = _SPOT_MARKS.length
        SPOT_MARKS
            .filter(function (sm) {
                return sm.dirty;
            })
            .map(function (sm) {
                sm.dirty = false;
                return sm;n
            })
            .forEach(function (sm) {
                _saveOne(sm);
                if (!--remaining) {
                    callback();
                }
            });
    };
    function load (data) {
        SPOT_MARKS = data;
    }
    function createMark (spec) {
        var id = shortid.generate();
        var mark = {
            type : 'spot-mark',
            id : id,
            dirty : true,
            positionTrack : []
        };
        // include initial point if provided
        if (spec) mark.positionTrack.push(spec);
        SPOT_MARKS.push(mark);
        return id;
    }
    function addMarkEra (id, spec) {
        var mark = getSpotMark(id);
        
        if (!mark)
            _retrieve(id).then(addEra).catch(handleError);
        else
            addEra();
        
        if (spec.update) {
            // run save on all dirty members
            // and resetting dirty flags
            console.log('call save all');
        }
        
        function addEra () {
            // todo: check that spec is valid
            mark.inserted = true;
            mark.dirty = true;
            mark.positionTrack.push(spec);
        }
        function handleError (e) {
            console.log(e);
        }
    }
    
}();

module.exports = SpotMarker;
