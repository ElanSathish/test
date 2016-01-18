
/*Calling all the Frameworks*/
var express = require('express'),

    mongoose = require('mongoose');

/*Assigning environment if not set up by node default then the value will be assigned as "development"*/
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/*Creating the application*/
var app = express();
var config={
rootPath: __dirname
}
require('./server/config/express')(app, config)
/*Mongoose Database*/
if(env === 'development'){
mongoose.connect('mongodb://localhost/multivision');
}
else
{
    mongoose.connect('mongodb://eelan:multivision@ds061954.mongolab.com:61954/multivision');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    console.log("Mongodb opened");
});

/*Creating Schema --- Commented out as of chap 4 - 03
var mongooseSchema = mongoose.Schema({message: 'string'});
var Message = mongoose.model('Message', mongooseSchema);
var mongoMessage;
Message.findOne().exec(function (err, messageDoc){
    mongoMessage = messageDoc.message;
});*/


/*Page Rendering*/
app.get('/partials/*', function(req, res){
 res.render('../../public/app/' + req.params[0]);
 console.log("Got the request");
 });

app.get('*', function(req, res){
    res.render('index'); /*Commented out as of chap 4 - 03
    {
        mongoMessage: mongoMessage
    });*/
});



/*Port Assigning*/
var port = process.env.PORT || 3030
app.listen(port);

/*Logging to the Console*/
console.log("server listening on port.."+ port + "...");