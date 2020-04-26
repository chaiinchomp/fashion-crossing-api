const app = require('./server.js');

var port = process.env.PORT || 8000;

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log('App started!');
});
