const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const useragent = require('useragent');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.route('/whoami')
  .get(function(req, res) {
    let response = {};
    response.IP = req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress.replace(/[:f]/g, '');
    response.language = req.headers['accept-language'].split(',')[0];
    const ua = useragent.parse(req.headers['user-agent']);
    response.OS = ua.os.toString();
    //response.headers = req.headers;
    res.status(200).send(response);
  });

 app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
 });

 const listener = app.listen(process.env.PORT, function() {
   console.log('server listening on port ' + listener.address().port);
 });