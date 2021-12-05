const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const mongoose = require('mongoose')
const DB_URL = `mongodb+srv://cartercomeau:${process.env.DB_PASSWORD}@comp3123.qdcbr.mongodb.net/101253879_assignment2?retryWrites=true&w=majority`
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
const employeeRoutes = require('./routes/EmployeeRoutes.js')
const adminRoutes = require('./routes/AdminRoutes.js')
var cors = require('cors');
app.use(cors());

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB Successfully")
}).catch(err => {
    console.log("Could not connect to the DB")
    process.exit();
})

app.use('/', employeeRoutes)

app.use('/', adminRoutes)

app.listen(8029, ()=> {
    console.log('Server is listening on port 8029')
});