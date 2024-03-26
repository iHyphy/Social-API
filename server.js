const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); // Import consolidated routes from routes/index.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files in production environment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Use routes
app.use(routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetworkdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// MongoDB connection error handling
mongoose.connection.on('error', err => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
