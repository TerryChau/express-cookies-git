//The following is a simple Express Madlib application for practicing the use of persistent local data storage with cookies.  Parts of this application is incomplete.point of this exercise is to practice persistent storage using express and cookie parser.

let express = require('express'); 


let app = express() 


app.use(express.urlencoded());

//We need to require and use the cookie-parser application here:

let cookieParser = require('cookie-parser'); 
app.use(cookieParser()); 


var session=require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: 'true', //Forces the session to be saved back to the session store, even if the session was never modified during the request.
  saveUninitialized: true, //Forces a session that is "uninitialized" to be saved to the store
  })
);


//basic route for homepage 
app.get('/', (req, res)=>{ 
  res.send("<html><h1>Let's play Mad Libs!  Give me a person:</h1><form method='post' action='/postperson'><input type='text' name='person'><input type='submit' value='SUBMIT'/></form></html>"); 
});

//

app.post('/postperson', (req, res)=>{ 
  if(!req.locals.person){
    req.locals.person=req.body.person;
  }
  console.log(req.session.person);
  res.send("<html><h1>Give me a verb(root form):</h1><form method='post' action='/postverb'><input type='text' name='verb'><input type='submit' value='SUBMIT'/></form></html>"); 
}); 


app.post('/postverb', (req, res)=>{ 
  if(!req.session.verb){
    req.session.verb=req.body.verb;
  }
  console.log(req.session.verb);
  res.send("<html><h1>Give me a noun:</h1><form method='post' action='/postnoun'><input type='text' name='noun'><input type='submit' value='SUBMIT'/></form></html>"); 
}); 

app.post('/postnoun', (req, res)=>{ 
  const person=req.session.person;
  const verb=req.session.verb;
  const noun=req.body.noun;
  console.log(person);
  console.log(verb);
  console.log(noun);
  res.send('<html><h1>And the completed phrase is...</h1><p>'+ person +' can '+verb+' all the '+ noun +' some of the time and some of the '+ noun +' all the time, but '+person+' cannot '+verb+' all the '+ noun+' all the time.</p><form method="get" action="/setcookies"><input type="submit" formnovalidate value="Add Data and Value"/></form></html>'); 
}); 

app.get('/getperson', (req, res)=>{ 
  /*
  we need to retreive data from our 
  
  
  */
  let views = req.cookies.views || 0;
  //now we need to set cookie here
  res.setHeader('Set-Cookie', 'views='+ ++views);
  console.log("cookie views is %s", views);
  
  res.send('<html><h1>And the completed phrase is...</h1><p>'+ req.cookies.person +' can '+req.cookies.verb+' all the '+ req.cookies.noun +' some of the time and some of the '+ req.cookies.noun +' all the time, but '+req.cookies.person+' cannot '+req.cookies.verb+' all the '+req.cookies.noun+' all the time.</p><form method="get" action="/setcookies"><input type="submit" formnovalidate value="Add Data and Value"/></form></html>'); 
}); 




app.get('/getperson', (req, res)=>{ 
  /*
  we need to retreive data from our 
  
  
  */
  let views = req.cookies.views || 0;
  //now we need to set cookie here
  res.setHeader('Set-Cookie', 'views='+ ++views);
  console.log("cookie views is %s", views);
  
  res.send('<html><h1>And the completed phrase is...</h1><p>'+ req.cookies.person +' can '+req.cookies.verb+' all the '+ req.cookies.noun +' some of the time and some of the '+ req.cookies.noun +' all the time, but '+req.cookies.person+' cannot '+req.cookies.verb+' all the '+req.cookies.noun+' all the time.</p><form method="get" action="/setcookies"><input type="submit" formnovalidate value="Add Data and Value"/></form></html>'); 
}); 


//server listens to port 3006
//start with nodemon app2.js
app.listen(3006, (err)=>{ 
  if(err) //res.redirect('/');
  throw err; 
console.log('listening on port 3006'); 
}); 

