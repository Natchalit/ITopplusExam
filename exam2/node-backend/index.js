let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');
    cors = require('cors'),
    bodyParser = require('body-Parser'),
    mongoDb = require('./database/db'),
    createError = require('http-errors')

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database successfuly connected');
}), error => {
  console.log('Database error ' + error);
}

const userRoute = require('./routes/user.route');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cors());

//Static Dir path
app.use(express.static(path.join(__dirname, 'dist/')))

//Base route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

//API Root
app.use('/api', userRoute);

//Port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
})

//404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

//error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message)
})
