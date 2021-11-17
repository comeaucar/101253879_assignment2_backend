const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {type: String, unique:true},
    password: String,
    token: String
})

const Admin = mongoose.model("admin", AdminSchema)

module.exports = Admin