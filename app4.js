const express = require('express');
const app = express();

//import and use the cookie-parser middleware here
const cookies = require('cookie-parser');
app.use(cookies());


//const bodyParser = require('body-parser');
//const cookies = require('cookie-parser');

//const db = require('./db');



//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


//app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send("<html><h1>Express Cookie Excercise</h1><p>This exercise is meant to be a simple walk-through on how to set, retrieve, and delete cookies in Express.  <br><br>Cookies are a client-side data store.  With every client-side request sent to the server, cookies from the client-side are also sent to the server within that request. This is necessary, since web servers do not retain information about their clients after sending a webpage to the client's browser.  Cookies provide a way for the server to distinguish between different clients by providing a unique session cookie to each client.  Cookies also provide a way to persist data on the client side for a set duration of time.  Since cookies are transmitted back to the server with every request, the cookie data store should not be abused to store large amounts of data.  If large amounts of data need to be persisted, it is best to use a database, and assign each client a session cookie or token to access the database.<br><br> Let us begin by setting a cookie.<br><br> Instructions for setting the cookie are currently missing from the server's index.js.  To remedy this issue, in line 27 of index.js, add:<br><br> res.setHeader('Set-Cookie', 'cookie_name=cookie_value')<br><br>Restart this Repl (green button) after editing the line.  It is noted that res.setHeader() must be set before res.end() or res.send(), since the header is sent with the response in res.end() or res.send().  Furthermore, 'cookie_name=cookie_value' could be any string bisected by one '=' sign, wherein cookie_name does not contain a space, tab, separator character, or control character.  See the documentation for <a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie' target='_blank'>Set-Cookie</a>.</p><p>Now that the instructions for setting a cookie are in place, when the 'Set Cookies' button below is pressed, the webserver will send a response to the client's browser with instruction for the client to store a cookie.  Go ahead and press the button!</p>  <form method='get' action='/setcookies'><input type='submit' value='Set Cookies'/></form></html>");
});


//set first cookies
app.get('/setcookies', (req, res) => {
  //Need to add instructions here to set the cookie
  res.setHeader('Set-Cookie', 'cookie_name=cookie_value')

  //console.log("Cookie is now set.")
  res.send("<html><p>Great, the cookie is now set!<br><br>To see the cookie on the client's browser:<br><br>On Firefox, press F12 > Storage > Cookies > 'https://express-cookie--terrychau.repl.co'.</p><p>On Chrome or Chromium, press F12 > Application > Storage > Cookies > 'https://express-cookie--terrychau.repl.co'.</p><p>To access the cookie in the Express server, we need to import and use the <a href='https://www.npmjs.com/package/cookie-parser' target='_blank'>cookie-parser middleware</a> in lines 5-6 of index.js. Restart this Repl (green button) after editing the lines.</p><p>Notice in line 39 of index.js that req.cookies is able to </p>  <form method='get' action='/readcookies'><input type='submit' value='Read Cookies'/></form></html>");
});


app.get('/readcookies', (req, res) => {
  //Need to add instructions here to set the cookie
  console.log("",req.cookies)
  console.log("type",typeof req.cookies)
  //console.log("Cookie is now set.")
  res.send("<html><p>Great, the cookie is now set!<br><br>To see the cookie on the client's browser:<br><br>On Firefox, press F12 > Storage > Cookies > 'https://express-cookie--terrychau.repl.co'.</p><p>On Chrome or Chromium, press F12 > Application > Storage > Cookies > 'https://express-cookie--terrychau.repl.co'.</p><p>To access the cookie in the Express server, we need to import and use the <a href='https://www.npmjs.com/package/cookie-parser' target='_blank'>cookie-parser middleware</a> in lines 5-6 of index.js. <br><br>Restart this Repl (green button) after editing the lines.</p>  <form method='get' action='/setcookies'><input type='submit' value='Read Cookies'/></form></html>");
});

app.get('/deletecookies', (req, res) => {
  //Need to add instructions here to set the cookie
  res.setHeader('Set-Cookie', 'cookie_name=cookie_value')

  //console.log("Cookie is now set.")
  res.send("<html><p>Great, the cookie is now set!<br><br>To see the cookie on the client's browser:<br><br>On Firefox, press F12 > Storage > Cookies > 'https://express-cookie--terrychau.repl.co'.</p><p>On Chrome or Chromium, press F12 > Application > Storage > Cookies > 'https://express-cookie--terrychau.repl.co'.</p><p>To access the cookie in the Express server, we need to import and use the <a href='https://www.npmjs.com/package/cookie-parser' target='_blank'>cookie-parser middleware</a> in lines 5-6 of index.js. <br><br>Restart this Repl (green button) after editing the lines.</p>  <form method='get' action='/setcookies'><input type='submit' value='Set Cookies'/></form></html>");
});


//set first cookies
app.get('/setcookies2', (req, res) => {
  let views = req.cookies.views || 1
  res.setHeader('Set-Cookie', 'views='+ ++views)
  res.send('Welcome to this Express Cookie Excercise.  On this page there are no cookies set yet.  <form method="get" action="/readcookie"><input type="submit" value="Set Cookies"/></form>');
});


app.get('/output', (req, res) => {
  let views=req.cookies.views
  res.send('views is:'+views+'<form method="get" action="/logout"><input type="submit" value="Clear Cookies"/></form><form method="get" action="/logout"><input type="submit" value="Clear Cookies"/></form>');
});


app.get('/logout', function(req, res){
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.redirect('/');
});
app.listen(3000, () => console.log('server started'));
