const mongoose = require('mongoose');

// Your connection string can be moved to an environment variable for production
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetworkdb';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed due to application termination');
    process.exit(0);
  });
});

module.exports = mongoose.connection;

