//https://www.geeksforgeeks.org/http-cookies-in-node-js/
let express = require('express'); 
let cookieParser = require('cookie-parser'); 
//setup express app 
let app = express() 
  
app.use(cookieParser()); 
  
  
//basic route for homepage 
app.get('/', (req, res)=>{ 
res.send('<h1>Hello, I am the Cookie Monster</h1><form action="/setuser"><input type="submit" formnovalidate value="Go to Google"/></form>'); 
}); 
  
//JSON object to be added to cookie 
let users = { 
name : "Ritik", 
Age : "18"
} 
  
//Route for adding cookie 
app.get('/setuser', (req, res)=>{ 
res.cookie("userData", users); 
res.send('user data added to cookie <h1>Hello, I am the Cookie Monster</h1><form action="/setuser"><input type="submit" value="Go to Google"/></form>'); 
}); 
  
//Iterate users data from cookie 
app.get('/getuser', (req, res)=>{ 
//shows all the cookies 
res.send(req.cookies ); 
}); 
  
//Route for destroying cookie 
app.get('/logout', (req, res)=>{ 
//it will clear the userData cookie 
res.clearCookie('userData'); 
res.send('user logout successfully <h1>Hello, I am the Cookie Monster</h1><form action="/setuser"><input type="submit" formnovalidate value="Go to Google"/></form>'); 
}); 
  
  
//server listens to port 3000 
app.listen(3005, (err)=>{ 
if(err) res.redirect('/');
//throw err; 
console.log('listening on port 3005'); 
}); 

