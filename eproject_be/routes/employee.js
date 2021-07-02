const router = require('express').Router();
const Employee = require('../models/employee');
const bcrypt = require('bcryptjs');
const config = require('../config');

router.post('/', async (req, res, next) => {
    let employee = new Employee();

    employee.name = req.body.name;
    employee.password = bcrypt.hashSync(req.body.password);
    employee.email = req.body.email;
    employee.zone = req.body.zone;
    employee.role = req.body.role;
    employee.image = employee.gravatar();
    employee.phone = req.body.phone;
    employee.status = req.body.status;

    try {
        employee = await employee.save();
        if (!employee) {
            return res.status(500).json({
                success: false,
                message: 'the employee cannot be create'
            });
        }

        res.json({
            success : true,
            employee: employee
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'the employee cannot be create',
            error: error
        });
    }
})

router.get('/', async (req, res, next) => {
    const employeeList = await Employee.find().select('-password');

        if (!employeeList) {
            return res.status(500).json({
                success: false,
                message: 'No employee exits'
            });
        }

        res.json({
            success : true,
            employees: employeeList
        })
})

module.exports = router;