var express = require('express');
var app = express();
var metadata = require('node-ec2-metadata');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/images'));
// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {

  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  var InstanceId = "";

  metadata.getMetadataForInstance('instance-id')
  .then(function(instanceId) {
      console.log("Instance ID: " + instanceId);
      InstanceId = instanceId;

      res.render('pages/index', {
        mascots: mascots,
        tagline: tagline,
        Instanceid: InstanceId
      });
  })
  .fail(function(error) {
      console.log("Error: " + error);
  });



});

// about page
app.get('/about', function(req, res) {
  
  res.render('pages/about');
});


 
metadata.getMetadataForInstance('instance-id')
.then(function(instanceId) {
    console.log("Instance ID: " + instanceId);
})
.fail(function(error) {
    console.log("Error: " + error);
});

app.listen(8080);
console.log('Server is listening on port 8080');