const mongoose = require('mongoose');

console.log("--->>", process.env.MONGO_URI)
const url = 'mongodb://127.0.0.1:27017/goal-tracker'

mongoose.connect(process.env.MONGO_URL || url).then(() => {
    console.log('mongo db server started and running');
}).catch(e => {
    console.log(e)
    console.log('Unable to connect to the database server');
})
