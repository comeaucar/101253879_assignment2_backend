const employeeModel = require('../models/EmployeeModel.js')
const express = require('express')
const router = express.Router();
const validation = require('../validation')

const emailValidation = validation.emailVal
const nameValidation = validation.nameVal

// GET Employees
router.get('/api/v1/employees', async(req, res) => {
    employeeModel.find({}, (err, employees) => {
        if(err){
            res.send(err.toString())
        }
        res.send(employees)
    })
})


// POST Employee
router.post('/api/v1/employees', async(req,res) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        return res.status(400).send({
            message: "Employee content can not be empty"
        })
    }

    const newEmployee = new employeeModel(req.body.newUser)
    
    if(emailValidation(req.body.newUser.emailid)){

    if(!nameValidation(req.body.newUser.firstname) && !nameValidation(req.body.newUser.lastname)){

    try{
        await newEmployee.save()
        res.status(201).send(req.body.newUser)
    }catch(err){
        res.status(500).send(err.toString())
    }
}else{
    res.status(500).send("Invalid First or Last Name")
}

}else{
    res.status(500).send("Invalid Email")
}
})


// GET Employee
router.get('/api/v1/employees/:employeeId', async(req,res) => {
    try{
        const employee = await employeeModel.findById(req.params.employeeId);
        res.status(200).send(employee)
        console.log("Employee Retrieved")
    }catch(err){
        res.status(500).send(err.toString())
    }
})
// PUT Employee
router.put('/api/v1/employees/:employeeId', async(req,res) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        return res.status(400).send({
            message: "Employee content can not be empty"
        })
    }

    try{
        const updatedEmployee = await employeeModel.findByIdAndUpdate(req.params.employeeId, req.body.newUser)
        await updatedEmployee.save()
        res.status(200).send("Employee Updated")
    }catch(err){
        res.status(500).send(err.toString())
    }
})
// DELETE Employee
router.delete('/api/v1/employees/:employeeId', async(req,res) => {
    try{
        const employee = await employeeModel.findByIdAndDelete(req.params.employeeId)
        if(!employee){
            res.status(500).send("Employee Not Found")
        }
        res.status(204).send("Successfully deleted employee with id: " + req.params.employeeId)
    }catch(err){
        res.status(500).send(err.toString())
    }
})


module.exports = router