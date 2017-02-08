var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
require('dotenv').config();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

var port = process.env.PORT || 9090; // set our port

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL); // connect to our database
var Poll = require('./models/poll');

// ROUTES FOR OUR API
// =============================================================================
io.on('connection', function (socket) {
  console.log('connected');
});

// test route to make sure everything is working (accessed at GET /api)
app.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' }); 
});

//=============================================================================
// on routes that end in /poll
// ----------------------------------------------------
app.route('/poll')

  // create a poll (accessed at POST /poll)
  .post(function(req, res) {
    
    var poll = new Poll();    // create a new instance of the poll model
    poll.id = makeid();
    poll.question = req.body.question;  // set the poll name (comes from the request)
    poll.multiple_answers = req.body.multiple_answers;
    poll.duplicate_ip = req.body.duplicate_ip;
    poll.total_votes = 0;
    poll.options = req.body.options.filter((option) => { return option.value !== "" });
    poll.ip_addresses = [];
    poll.save(function(err, poll) {
      if (err)
        res.send(err);
      res.json({poll: poll});
    });
  })

  // get all the poll (accessed at GET /api/poll)
  .get(function(req, res) {
    Poll.find(function(err, poll) {
      if (err)
        res.send(err);

      res.json(poll);
    });
  });

// on routes that end in /poll/:poll_id
// ----------------------------------------------------
app.route('/poll/:poll_id')

  // get the poll with that id
  .get(function(req, res) {
    Poll.findOne({id: req.params.poll_id}, function(err, poll) {
      if (err)
        res.send(err);
      if (poll) {
        res.json(poll);
      } else {
        res.status(404).json({error: true});
      }
    });
  })

  // update the poll with this id
  .put(function(req, res) {
    Poll.findOne({id :req.params.poll_id}, function(err, poll) {
      if (err){
        res.send(err);
      }
      if(poll.duplicate_ip == true){
        var ip = req.headers['x-forwarded-for'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress;
         
         if (poll.ip_addresses.indexOf(ip) === -1) {
            updateVotes(poll, req.body);
            poll.ip_addresses.push(ip);
            poll.markModified('ip_addresses');
            poll.markModified('options');
         }
      } else {
        updateVotes(poll, req.body);
        poll.markModified('options');
      }
      
      poll.save(function(err) {
        io.emit('vote:' + req.params.poll_id, poll);
        if (err){
          res.send(err);
        }else{
          res.json(poll);
        }
      });

    });
  });

function updateVotes(poll, votes) {
  if (votes) {
    poll.total_votes += Object.keys(votes).length;
    poll.options.forEach(function(option, index) {
      Object.keys(votes).forEach(function(key) {
        if (votes[key] === option.id) {
          poll.options[index].votes = option.votes + 1;
        }
      })
    });
  }
}

server.listen(port);
console.log('Starting on port ' + port);

