const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const bots = {
    1: {name: "INet", id: "936271643066642513", prefix: "!", owner: "Vexi", type: "js"},
}

let bot_number = 2; // Changes the amount of bots Faded has made.


app.get('/', function(req, res) {
    res.send("FADED API! \n\n" + config.webserver.version);
});



app.get('/api/bots', function(req, res) {
    res.json(bots);
});


app.get('/api/bots/:bot_number', (req, res) => {
    if (bots[req.headers.bot_number]){
          res.json(bots[req.headers.bot_number])
    } else {
          res.json('User not found')
    }
});


app.post('/api/bots', (req, res) => {
    if (req.headers.name && req.headers.id && req.headers.prefix && req.headers.owner && req.headers.type){
         const {name, id, prefix, owner, type} = req.headers
         bots[bot_number] = {name, id, prefix, owner, type}
         res.send(`Successfully created bot: ${req.headers.name} | ${req.headers.id} || ${req.headers.prefix} || ${req.headers.owner} || ${req.headers.type}`)
         bot_number++
    } else {
         res.send('Failed to create bot')
    }
});






app.listen(config.webserver.port, function() {
    console.log("FADED API is listening on port " + config.webserver.port);
    console.log(`Node version: ${process.version}`);
    console.log(`Node mode: ${config.node.mode}`);

})
