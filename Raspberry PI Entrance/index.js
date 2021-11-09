var awsIot = require('aws-iot-device-sdk');
 
//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts 
// to connect with a client identifier which is already in use, the existing 
// connection will be terminated.
//
var device = awsIot.device({
   keyPath: 'f73e890b3a47960f073340094ec7494c35359171a89c08a559a71514511d0c62-private.pem.key',
  certPath: 'f73e890b3a47960f073340094ec7494c35359171a89c08a559a71514511d0c62-certificate.pem.crt',
    caPath: 'AmazonRootCA1.pem',
  clientId: 'MyConnect1',
   host: 'a1bbwel6egcz3a-ats.iot.us-east-2.amazonaws.com'
});
 
let cars = ['Fiat 500-Sedan','Fiat Panda-Sedan', 'Smart Roadster-Sedan', 'Smart Crossblade-Sedan', 'Fiat Punto-Sedan', 'Lancia Ypsilon-Sedan', 'Alfa Romeo Giulia-Sedan', 'Alfa Romeo Giulietta-Sedan', 'Alfa Romeo Spider-Sedan', 'MINI-Sedan', 'MINI Roadster-Sedan', 'MINI Clubman-Sedan', 'Audi A4-Sedan', 'Audi TT-Sedan', 'Infiniti QX30-Sedan', 'Infiniti QX50-SUV', 'Peugeot 306-SUV', 'Peugeot 108-SUV', 'Skoda Octavia-SUV', 'Toyota Camry-SUV']
let plate_numbers = ['BB03813', 'ED485KC', 'BE027AB', 'DW36067', 'CT410XN', 'AB123CD', 'DP954HN', 'AJ854HR', 'AT053WP', 'BC067HP', 'BD118KP', 'BL856JF', 'DA466RB', 'AA111AA', 'DW469CP', 'EL674CW', 'ED485KC', 'CT410XN', 'AS952XV', 'BK905EV'] 
let colors = ['Red', 'Black', 'White', 'Green', 'Blue'] 


//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//



device
  .on('connect', function() {
    console.log('connect');
    setInterval(function(){
        var today = new Date();
        var current_time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        idx = Math.floor(Math.random() * cars.length);
        var vehicle_model = cars[idx];
        var vehicle_color = colors[Math.floor(Math.random() * colors.length)];
        var plate_number = plate_numbers[idx];
        
        console.log('New car has entered:')
        console.log(vehicle_color, vehicle_model + " | plate number: "+ plate_number + " | In time: " + current_time);
        

        device.publish('ParkingTopic', JSON.stringify({ plate_number: plate_number, vehicle_model: vehicle_model, color: vehicle_color, in_time: current_time, out_time: null, slot_alloted: null }));
    },10000);
    
  });
 
device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });

