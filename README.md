# spot-marker

*npm module* which allows temporal information about a given point to be recorded

- Positional memory  
  A spot remembers where it was at temporaly distributed moments.

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

 *+* : Position at give epoch.
 *-* : During timespan.
 *#* : Interpolation not valid between this and next point

    P1 +----+-----#        +----+--------------+
    P2    +------+-------+------------+
    P3       +------------+
    P4                +------#  ++---------+
p
### Data structure

    [{
        id : 'xo93iksd',    // unique id
        type : 'spot-mark', // categorization
        dirty : false,      // has changed and needs 
		                    // to be saved
        positionTrack : [
           { lat : NN, long : MM, epoch : whenMya1 },
           { lat : NN, long : MM, epoch : whenMya2 },
           { lat : NN, long : MM, epoch : whenMya3 }
        ]
     },{
        ...
     }]
