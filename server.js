const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// mongoose.connect(
//     process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mongodb-hw',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
// );

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/mongodb-hw', {
        useNewUrlParser: true,
        useUnifiedTopology: true
});

mongoose.set('debug', true);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
