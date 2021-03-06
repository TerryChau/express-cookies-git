/*
This goal of this exercise is to store the time at which the stop watch is
stopped.  Each stopped time should be listed on a separate line underneath the
timer in timer.html.  For example, after pressing STOP/RESET 4 times, the html
output should be:

00:00:00
STOP/RESET
CLEAR
00:00:07
00:00:10
00:02:05
00:00:06

Since more than one user may be using this application simultaneously, it is not
sufficient to simply store the list of stopped times in a persistent array.
Different users have different lists of stopped times.  Use cookies and/or
sessions to persist the stopped times for different users.

Finally, while it is possible to rewrite timer.html in another template engine, 
such as Pug or Mustache, it is unnecessary to do so, since
'fs.readFileSync('./timer.html', 'utf8')' produces a string that can be readily
edited using Javascript string commands.

All areas with //... need to be completed.
*/

var express = require('express');
var app = express();
var fs = require('fs');

//Require and use middleware of choice for persistent storage here
//...



//Middleware for parsing incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: false }));

//Landing page
app.get('/', (req, res) => {
  var html = fs.readFileSync('./timer.html', 'utf8');
  res.send(html);
});

//Page after submission of form data
app.post('/', (req, res) => {
  if (req.body.clearform) {
    //The user presses 'CLEAR', causing the persistent storage to be erased.  //Clear the persistent storage on the client's browser, and redirected the //client to the landing page.
    //...


  }
  else {
    //The user presses 'STOP/RESET'.
    seconds = ("0" + (req.body.hiddenTime) % 60).slice(-2);
    minutes = ("0" + parseInt((req.body.hiddenTime) / 60)).slice(-2);
    hours = ("0" + parseInt((req.body.hiddenTime) / 3600)).slice(-2);
    //Store the seconds, minutes, and hours in a persistent data store.
    //...


    //Now retrieve the list of times from the persistent data store and display //on the webpage.
    //...



  }
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log('listening on port 3000');
});
