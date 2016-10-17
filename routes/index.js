var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/addLocation', function (req, res) {
    var data = req.body;
    req.collection.insert(
        {
            "name" : data.name,
            "category" : data.category,
            "loc" : {
                "type" : "Point",
                "coordinates" : [data.longitude, data.latitude]
            }
        });
    req.collection.ensureIndex({ "loc": "2dsphere" })
    req.collection.find({}).toArray(function (err, items) {
        if (!err) {
            res.json(items);
        } else {
            console.log('error', err);
        }
    });
});

router.get('/getLocations', function (req, res) {
    req.collection.find({}).toArray(function (err, items) {
        if (!err) {
            res.json(items);
        } else {
            console.log('error', err);
        }
    });
});

router.post('/addLocation', function (req, res) {
    var data = req.body;
    req.collection.insert(data);
    req.collection.find({}).toArray(function (err, items) {
        if (!err) {
            res.json(items);
        } else {
            console.log('error', err);
        }
    });
});

module.exports = router;