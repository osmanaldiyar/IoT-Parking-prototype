var awsIot = require('aws-iot-device-sdk');
 
//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts 
// to connect with a client identifier which is already in use, the existing 
// connection will be terminated.
//
var device = awsIot.device({
   keyPath: '89ee277730b68144c4fa151d551150bab6177d77273bd19d42a05770ea4c350d-private.pem.key',
  certPath: '89ee277730b68144c4fa151d551150bab6177d77273bd19d42a05770ea4c350d-certificate.pem.crt',
    caPath: 'AmazonRootCA1.pem',
  clientId: 'ExitConnect1',
   host: 'a1bbwel6egcz3a-ats.iot.us-east-2.amazonaws.com'
});
 
let cars = ['Fiat 500','Fiat Panda', 'Smart Roadster', 'Smart Crossblade', 'Fiat Punto', 'Lancia Ypsilon', 'Alfa Romeo Giulia', 'Alfa Romeo Giulietta', 'Alfa Romeo Spider', 'MINI', 'MINI Roadster', 'MINI Clubman', 'Audi A4', 'Audi TT', 'Infiniti QX30', 'Infiniti QX50', 'Peugeot 306', 'Peugeot 108', 'Skoda Octavia', 'Toyota Camry']
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
        
        console.log("Audi A4" + ' ' + "DA466RB" + ' has left:')
        console.log("Red", "Audi A4 Sedan" + " | plate number: "+ "DA466RB" + " | In time: " + current_time);
        

        //device.publish('ParkingExitTopic', JSON.stringify({ plate_number: plate_number, vehicle_model: vehicle_model, color: vehicle_color, out_time: current_time }));
        device.publish('ParkingExitTopic', JSON.stringify({ plate_number: "DA466RB", vehicle_model: "Audi A4", color: "Red", out_time: current_time }));
    },10000);
    
  });
 
device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });

