// Express api
var express = require('express');
var cors = require('cors');
var app = express();

// Database
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var url = ''; // ADD YOUR DATABASE URL

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// HOME PAGE
// GET api
app.get('/', function(req, res) {
  console.log(req);
  mongodb.MongoClient.connect(url, function(err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    var db = database;
    console.log("Connected to database");
    var collection = db.collection('keg');
    collection.find().toArray(function(err, docs) {
      res.json(docs);
    });
  });
});


// KEGS PAGE
// GET api
app.get('/kegs', function(req, res) {
  process.nextTick(function() {
    mongodb.MongoClient.connect(url, function(err, database) {
      if (err) {
        console.log(err);
        process.exit(1);
      }

      var db = database;
      console.log("Connected to database");
      var collection = db.collection('keg');
      collection.find().toArray(function(err, docs) {
        res.json(docs);
      });
    });
  });
});

// POST api
app.post('/kegs/post', function(req, res) {
  var data = {
    _id:req.body.id,
    beername:req.body.beername,
    brewery:req.body.brewery,
    beertype:req.body.type,
    alchoholpercent:Number(req.body.alcoholPercent),
    description:req.body.description,
    kegsize:Number(req.body.kegsize),
    amountpoured:0,
    waste:0,
    glassespoured:0,
    amountleft:100,
    pulseCount:0
  };
  JSON.stringify(data);
  console.log(data);
  mongodb.MongoClient.connect(url, function(err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    var db = database;
    console.log("Connected to database");
    var collection = db.collection('keg');
    collection.insert(data);
    res.json(data);
  });
});

// DELETE api
app.delete('/kegs/delete/:id', function(req, res) {
  parserURL = req.url;
  parseURL = parserURL.split('/');
  id = parseURL[3];
  mongodb.MongoClient.connect(url, function(err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    var db = database;
    console.log("Connected to database");
    var collection = db.collection('keg');
    collection.remove({_id : id});
  });
});

app.put('/update', function(req, res) {
  console.log(req.body);
  mongodb.MongoClient.connect(url, function(err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    var db = database;
    console.log("Connected to database");
    var collection = db.collection('keg');
    collection.update(
      {_id : req.body.sensorid},
      {
        $set: {
          pulseCount:req.body.pulseCount,
          amountpoured:req.body.amountpoured,
          amountleft: req.body.amountLeft
        }
      }
    );
    db.close();
  });
});

var PORT = process.env.PORT || 3001;

app.listen(PORT);
console.log(`app is listening on port ${PORT}`);
