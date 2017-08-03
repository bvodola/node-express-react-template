const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app);

// ===============
// Database Config
// ===============
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongoosePromise = mongoose.connect('MONGO_URL', {useMongoClient: true});

// =======
// Schemas
// =======
const usersSchema = new Schema({
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const Users = mongoose.model('ads', usersSchema);

// ==========
// Middleware
// ==========
app.use(bodyParser.json()); // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies

// ===================
// Production Settings
// ===================
if(app.settings.env == 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// ===
// API
// ===
app.get('/api', (req, res) => {
  res.send('Welcome to the API');
});

// ======
// Server
// ======
server.listen(port, () => console.log(`Listening on port ${port}`));
