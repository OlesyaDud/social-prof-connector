const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');

const app = express();
connectDB();

// Init Middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API RUNNING'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`Server started on port ${PORT}`.bgCyan));