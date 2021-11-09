
//const ejs = require('ejs');
const express = require("express");
const app = express();
const path = require("path");


app.use(express.static(path.join(__dirname, 'public')));



app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/dashboard", (req, res) => {    
    res.render("dashboard_front");
});

app.get("/historical_data", (req, res) => {
    res.render("historical_data.ejs");
});

app.listen(3001, () => {
    console.log("Application started and Listening on port 3001");
});