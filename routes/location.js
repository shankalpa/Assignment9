var express = require('express');
var router = express.Router();


router.post('/getNearestLocation', function (req, res) {
    var data = req.body;
    var lat = data.lat;
    var lon = data.lon;
    
    req.collection.find(
        {
            loc : {
                $near : {
                    $geometry : {
                        type : "Point" , 
                        coordinates : [lon, lat]
                    }, 
                }
            }
        }
    ).limit(3).toArray(function (err, items) {
        if (!err) {
            res.json(items);
        } else {
            console.log('error', err);
        }
    });
});


module.exports = router;