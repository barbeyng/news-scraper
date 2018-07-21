// DEPENDENCIES

var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    routes = require('./controllers/routes.js')
    mongoose = require('mongoose'),
    exphbs = require('express-handlebars'),
    PORT = process.env.PORT || 8080,
    MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlinesScraper',
    app = express();
    

// MIDDLEWARE

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/public', express.static('./public'));
app.use(routes);

// Handlebars

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// MongoDB connection

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function () {
    console.log('Now listening on port ' + PORT + '.');
});
