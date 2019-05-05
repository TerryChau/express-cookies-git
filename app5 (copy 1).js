/*
This point of this exercise is to design a persistent data store using Express and express-sessions

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
  res.send(html);
});

app.post('/', (req, res)=>{
  console.log(req.body.logEntry);
  console.log(req.body.usrname);
  var html = fs.readFileSync('./log.html', 'utf8');
  res.send(html);
});


app.listen(3007, (err)=>{ 
  if(err) //res.redirect('/');
  throw err; 
console.log('listening on port 3007'); 
}); 
