# spot-marker

*npm module* which allows temporal information about a given point to be recorded

- Positional memory  
A spot remembers where  it was at distributed moments in the past

- Undetermined periods  
  Optionally store periods during which it's position could not be determined.

- Spherical position  
  Spots store surface position on a globe in longitude and latitude.

- Database access  
  Read and write data to and from various data storage.


## installation

    npm install spot-marker

## Usage

    var spotMarker = require('spot-marker');


## Spot data
   Spot data is store as points in time as illustrated below.

 *-* : Time spans.
 *+* : Position at give timespan.
 *#* : Interpolation not valid between this and next point

    P1 +----+-----#        +----+--------------+
    P2    +------+-------+------------+
    P3       +------------+
    P4                +------#  ++---------+

### Data structure

    [{
        id : 'xo93iksd',    // shortid
        type : 'spot-mark', // for filtering
        dirty : false,      // has changed and needs to be saved
        positionTrack : [
           { lat : NN, long : MM, era : whenMya },
           { lat : NN, long : MM, era : whenMya },
           { lat : NN, long : MM, era : whenMya }
        ]
     },{
        ...
     }]
