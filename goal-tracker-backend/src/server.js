const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const goalRoutes = require('./routes/goalRoutes');
const cors = require('cors');
const logs = require('./middleware/log')

dotenv.config();
require('./dbConfig');

const app = express();

app.use(express.json());
app.use(cors());

app.use(logs);
app.use('/api/users', userRoutes);
app.use('/api/goals', goalRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
})


