
'use strict';

const express     = require('express');
var bodyParser = require('body-parser')
var pdf = require('html-pdf');
var axios=require("axios")
var options = { format: 'Letter' };
 
var html='<table style="border:1px solid black"><tr><th>Firstname</th><th>Lastname</th><th>Age</th></tr><tr><td>Jill</td><td>Smith</td><td>50</td></tr></table>'
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname +'./../www')); //serves the index.html

      

  app.post('/pdf', (req, res) =>{
        
     
      pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
        if (err) console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
        res.send('Got a POST request')
      })




/****************************************************
 *               Listening
 * ***************************************************/ 
        app.listen(process.env.PORT || 3000, () => {
          console.log("Listening on port " + 3000);
        });  







