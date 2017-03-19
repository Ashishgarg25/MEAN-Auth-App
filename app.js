//Always Use nodemon to start the server automatically...
//All Dependencies..
//Start MongoDB Servier with C:\Program Files\MongoDB\Server\3.4\bin\mongod
const express = require ('express');
const path = require ('path');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const passport = require ('passport');
const mongoose = require ('mongoose');
const config = require ('./config/database');

//Connect to Database
mongoose.connect(config.database);

//On Connected
mongoose.connection.on('connected', () => {
  console.log('connected to database' +config.database);
});

//On Error
mongoose.connection.on('Error', (err) => {
  console.log('Database Error: '+err);
});

//Initializing app var with express..
const app = express();

const users = require('./routes/users');

//Initializing Port Number..
const port = process.env.PORT || 8080;

//CORS Middleware..
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware..
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport') (passport);

app.use('/users', users);

//Router to Home-Page ...
app.get('/', (req, res) => {
  res.send("Invalid EndPoint");//Sending Text..
});

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Listening to Port using arrow function..
app.listen(port, () => {
  console.log('Server started on port.. '+port);
});
