require('dotenv').config();
const express = require('express');
const app = express();
let cors = require('cors');

const customerApiRouter = require('./app/Api/customerApi');
const actionApiRouter = require('./app/Api/actionApi');
const userApiRouter = require('./app/Api/userApi');

app.use(express.json());
app.use(cors());

// API Customer Routes
app.use('/api/customer', customerApiRouter);

// API Action Routes
app.use('/api/action', actionApiRouter);

// API User Routes
app.use('/api/user', userApiRouter);

/* app.get('/', function(req, res){
    res.send('Hello World!');
}); */

app.listen(process.env.PORT || 8080, function(){
    console.log('Serwer Node.js działa');
});