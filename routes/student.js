const router = require('express').Router();

let Student = require('../models/student.model');

//home
router.route('/').get((req, res) => {
    Student.find()
        .then(student => res.json(student))
        .catch(error => res.status(400).json("Error: " + error));
});

//add
router.route('/add').post((req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;

    const newStudent = new Student({
        fullname,
        email
    });

    newStudent.save()
        .then(student => res.json("New student added."))
        .catch(errpr => res.status(400).json("Error: " + error));
});

router.route('/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: ' + err));
});

//DELETE
router.route('/:id').delete((req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.json('Student deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
//update
router.route('/update/:id').post((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            student.fullname = req.body.fullname;
            student.email = req.body.email;


            student.save()
                .then(() => res.json('Student updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});




//update




module.exports = router;