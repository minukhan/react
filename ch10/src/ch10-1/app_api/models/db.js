const mongoose = require('mongoose');
//yL3ggsefzZccSlPl  user = tjddn

//'mongodb+srv://myatlasdbuser:<7722p100>@cluster0.vdhcntf.mongodb.net/Loc8r'
const dbURI = 'mongodb+srv://myatlasdbuser:7722p100@cluster0.vdhcntf.mongodb.net/Loc8r'

const dbPort = 27017;
// const dbURI = `mongodb://127.0.0.1:${dbPort}/Loc8r`;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected',function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);   
});
mongoose.connection.on('disconnected',function () {
    console.log('Mongoose disconnected');
})

var gracefulShutdown = function (msg, callback){
    mongoose.connection.close(function (){
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

mongoose.connection.on('SIGUSR2',function () {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
mongoose.connection.on('SIGINT',function () {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
mongoose.connection.on('SIGTERM',function () {
    gracefulShutdown('Heroku app shutdown', function() {
        process.exit(0);
    });
});

require('./locations')