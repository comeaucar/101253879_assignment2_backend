const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    emailid: {type: String, unique:true}
})

const Employee = mongoose.model("employee", EmployeeSchema)

module.exports = Employee