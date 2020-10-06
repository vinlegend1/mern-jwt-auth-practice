const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Connected to MongoDB successfully!')
})

require('./passport');
app.use(cookieParser());
app.use(cors());
app.use(flash());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const userRouter = require('./routes/user');

app.use('/api/user', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(PORT, console.log(`Server started on port ${PORT}`));