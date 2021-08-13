var express = require('express');
var app = express();
var metadata = require('node-ec2-metadata');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/images'));
// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {

  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012 },
    { name: 'Tux', organization: "Linux", birth_year: 1996 },
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013 }
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

  var args = [ instanceid ];
  const privateip = metadata.getMetadataForInstance('network/interfaces/macs/mac/ipv4-associations/public-ip', args);

  /*const amiid = "ami id";
  const instanceid = "instance id";
  const hostname = "hostname";
  const instancetype = "instancetype";
  const publicipv4 = "public ipv4";
  const publichostname = "public hostname";
  const mac = "mac";
  const iaminfo = "iam";*/

  Promise.all([amiid, instanceid, hostname, instancetype, publicipv4, publichostname, mac, iaminfo, privateip]).then((values) => {
    
    console.log(values);

    res.render('pages/index', {
      mascots: mascots,
      tagline: tagline,
      amiid: values[0],
      instanceid: values[1],
      hostname: values[2],
      instancetype: values[3],
      publicipv4: values[4],
      publichostname: values[5],
      mac: values[6],
      privateip: values[8],
      iaminfo: JSON.parse(values[7]
      )
    });

  });



});

// about page
app.get('/about', function (req, res) {

  res.render('pages/about');
});





app.listen(8080);
console.log('Server is listening on port 8080');