/*
This goal of this exercise is to store the time at which the stop watch is stopped.  Each stopped time should be listed on a separate line underneath the timer in timer.html.  For example, after pressing STOP/RESET 4 times, the html output should be:

00:00:00
STOP/RESET
CLEAR
00:00:07
00:00:10
00:02:05
00:00:06

Since more than one user may be using this application simultaneously, it is not sufficient to simply store the list of stopped times in a persistent array.  Different users have different lists of stopped times.  Use cookies and/or sessions to persist the stopped times for different users.

Finally, while it is possible to rewrite timer.html in another template engine (Pug, Mustache), it is unnecesary to do so, since 'fs.readFileSync('./timer.html', 'utf8')' produces a string that can be readily edited using Javascript string commands.
*/

var express = require('express');
var app = express();
var fs = require('fs');

//Require and use middleware of choice for persistent storage here
var session=require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: 'true', //Forces the session to be saved back to the session store, even if the session was never modified during the request.
  saveUninitialized: true, //Forces a session that is "uninitialized" to be saved to the store
  })
);

//Middleware for parsing incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: false }));

//Landing Page
app.get('/', (req, res)=>{
  var html = fs.readFileSync('./timer.html', 'utf8');
  res.send(html);
});

app.post('/', (req, res)=>{
  if(req.body.clearform){
    //The user presses 'CLEAR', causing the persistent storage to be erased, and client's browser to be redirected to the landing page.
    req.session.destroy();
    res.redirect('/');
  }
  else{
    seconds=("0"+(req.body.hiddenTime)%60).slice(-2);
    minutes=("0"+parseInt((req.body.hiddenTime)/60)).slice(-2);
    hours=("0"+parseInt((req.body.hiddenTime)/360)).slice(-2);
    if(!req.session.store){
      req.session.store="";
    }
    req.session.store+="<p>"+hours+":"+minutes+":"+seconds+"</p>"
    var html = fs.readFileSync('./timer.html', 'utf8');
    html=html.replace("<!--Add_Stopped_Times_Here-->", req.session.store)
    res.send(html);
  }
});

app.listen(3000, (err)=>{ 
  if(err) throw err; 
  console.log('listening on port 3000'); 
}); 
