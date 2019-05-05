/*
This goal of this exercise is to persist the time at which the stop watch is stopped.  Each stopped time should be listed on a separate line underneath the timer.  For example:

00:00:07


Since more than one user may be using this application at once, it is not sufficient to store the list of stopped times in a single array.  Different users would have a different list of stopped times.  Use cookies and sessions to persist the stopped times for difference users.

*/

let express = require('express');
let app = express();

var fs = require('fs');



var session=require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: 'true', //Forces the session to be saved back to the session store, even if the session was never modified during the request.
  saveUninitialized: true, //Forces a session that is "uninitialized" to be saved to the store
  })
);

app.use(express.urlencoded({extended: false }));

app.get('/', (req, res)=>{
  var html = fs.readFileSync('./log.html', 'utf8');
  console.log(req.body.hiddenTime);
  res.send(html);
});

app.post('/', (req, res)=>{
  console.log(req.body.logEntry);
  console.log(req.body.usrname);
  console.log(req.body.hiddenTime);
  console.log("clearform:",req.body.clearform);
  if(req.body.clearform){
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
  //req.session.store
  var html = fs.readFileSync('./log.html', 'utf8');
  console.log(typeof(html));
  //html=html.replace("<!--Add_Time_Here-->", "<p>cat</p>")
  html=html.replace("<!--Add_Stopped_Times_Here-->", req.session.store)
  res.send(html);
  }
});

app.listen(3008, (err)=>{ 
  if(err) //res.redirect('/');
  throw err; 
console.log('listening on port 3008'); 
}); 
