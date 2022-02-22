const mongoose = require('mongoose');
const { mongodb } = require('./keys');

//  Conexión a base de datos MongoDB
mongoose.connect(mongodb.URI, {
  useNewUrlParser: true
})
  .then(db => console.log('MongoDB is connected'))
  .catch(err => console.log(err));