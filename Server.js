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


  const amiid =  metadata.getMetadataForInstance('ami-id');
  const instanceid =  metadata.getMetadataForInstance('instance-id');
  const hostname =  metadata.getMetadataForInstance('hostname');
  const instancetype =  metadata.getMetadataForInstance('instance-type');
  const publicipv4 =  metadata.getMetadataForInstance('public-ipv4');
  const publichostname =  metadata.getMetadataForInstance('public-hostname');
  const mac = metadata.getMetadataForInstance('mac');
  const iaminfo = metadata.getMetadataForInstance('iam/info');

  Promise.all([amiid, instanceid, hostname, instancetype, publicipv4, publichostname, mac, iaminfo]).then((values) => {
    console.log(values);

    res.render('pages/index', {
      mascots: mascots,
      tagline: tagline,
      Instanceid: values
    });

});

  metadata.getMetadataForInstance('instance-id')
  .then(function(instanceId) {
      console.log("Instance ID: " + instanceId);
      InstanceId = instanceId;
  })
  .fail(function(error) {
      console.log("Error: " + error);
  });



});

// about page
app.get('/about', function(req, res) {
  
  res.render('pages/about');
});


 


app.listen(8080);
console.log('Server is listening on port 8080');