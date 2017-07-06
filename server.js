var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var _ = require('lodash');

// this scans the db folder and allows us access to each of the files
var db = massive.connectSync({
  connectionString: 'postgres://ssxcnwhmjmyavu:b8e8f9649c8cdbf73c5904d6578e4552a481ae004325a0dd86fbc873f94adc11@ec2-23-21-96-159.compute-1.amazonaws.com:5432/d8s71ugal0kj47?ssl=true'
})

console.log(db);

var app = express();
app.use(bodyParser.json());

var port = 3000;

app.get('/', function(req, res) {
  // this is accessed like this because of the massive.connectSync above
  // db.getAllInjuries( (err, injuries) => {
  //   res.send(injuries);
  // })

  // this is lodash shit
  var cars = [
    {plate: 'xyz'},
    {plate: 'abc'}
  ];

  var cake = _.template(`
    <h1>Injuries List</h1>
    <% injuries.forEach( function(injury) { %>
      <div><%= injury.name %> - <%= injury.description %></div>

      <% }) %>
    `);


  db.getAllInjuries( (err, injuries) => {
    var html = cake({
      injuries: injuries
    });

  res.send(html);
  })

});


app.get('/incidents', function(req, res) {
  var state = req.query.state;

  if(state) {
    db.getIncidentsByState([state], (err, incidents) =>{
      res.send(incidents);
    })
  } else {
    db.getAllIncidents( (err, incidents) => {
      res.send(incidents);
    })
  }
});


app.post('/incidents', function(req, res) {
  var incident = req.body;

  db.createIncident([incident.state, incident.injuryId, incident.causeId], (err, result) => {
    // massive will send back an array, so if you want just the object then use the [0]
    res.send(result[0]);
  })
  // res.send({id: 123});
});


app.listen(port, function() {
  console.log("Started server on port", port);
});
