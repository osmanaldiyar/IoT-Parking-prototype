var awsIot = require('aws-iot-device-sdk');

const ejs = require('ejs');
const express = require("express");
const app = express();

 
//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts 
// to connect with a client identifier which is already in use, the existing 
// connection will be terminated.
//
var device = awsIot.device({
   keyPath: '5dc8a53f59d30a59d1e5e570e9fa3d6a82ce1c00e2d9bf86623bb1531fd26fdf-private.pem.key',
  certPath: '5dc8a53f59d30a59d1e5e570e9fa3d6a82ce1c00e2d9bf86623bb1531fd26fdf-certificate.pem.crt',
    caPath: 'AmazonRootCA1.pem',
  clientId: 'client1',
   host: 'a1bbwel6egcz3a-ats.iot.us-east-2.amazonaws.com'
});
 

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//



app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});
  
  

const topic = 'ParkingTopic';

var value = {};

device
  .on('connect', function() {
    console.log('connect');
    setInterval(function(){
        
        
        device.subscribe([topic], () => {
          console.log(`Subscribe to topic '${topic}'`)
        })


    },10000);
    
  });
 
device
  .on('message', function(topic, payload) {
    data = payload;
    console.log('message', topic, payload.toString());
  });

  app.get("/", (req, res) => {
    if(typeof data == 'undefined'){
      res.render("undefined.html", {} );
    }
    res.render("static_website.html", {data: data.toString()} );
  });