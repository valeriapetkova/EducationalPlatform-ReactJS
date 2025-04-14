const router = require('express').Router();

const courseService = require('../services/courseService');
// const userService = require('../services/userService');
// const mongoose = require('mongoose');

router.get('/my-courses', async (req, res) => {
        const currentUser = req.user._id;

        try {
                const courses = await courseService.getMyCourses(currentUser);

                res.status(200).json(courses);

        } catch (error) {
                res.status(400).json(error.message);
        }
});

router.get('/popular-courses', async (req, res) => {

        try {
                const popularCourses = await courseService.getPopularCourses();

                res.status(200).json(popularCourses);

        } catch (error) {
                res.status(400).json(error.message);
        }
});

router.get('/', async (req, res) => {
        const { search } = req.query;

        try {
                let courses = [];
                if (search !== undefined && search !== '') {
                        courses = await courseService.getSearchedCourses(search);
                } else {
                        courses = await courseService.getAll();
                }
                
                res.status(200).json(courses);

        } catch (error) {
                res.status(400).json(error.message);
        }
});

// CREATE
router.post('/', async (req, res) => {
    const {courseName, category, description, startDate, endDate } = req.body;

        try {
                const courseData = {
                        courseName, 
                        category,
                        description, 
                        startDate,
                        endDate,
                        _ownerId: req.user._id
                };
                const course = await courseService.create(courseData);
            
                res.status(201).json(course); 
        } catch(error) {
            res.status(400).json(error.message);
        }
});

// DETAILS
router.get('/:courseId', async (req, res) => {
    const { courseId } = req.params;

     try {
        const course = await courseService.getOne(courseId);

        res.status(200).json(course); 

     } catch (error) {
       res.status(400).json(error.message);
     }
});

// DELETE
router.delete('/:courseId', async (req, res) => {
        const { courseId } = req.params;
        const currentUser = req.user._id;

        const courseOwner = await courseService.checkCourseOwner(courseId);

        if(courseOwner.toString() !== currentUser.toString()) {
                throw new Error('You have no permission to delete this course!');
        }

        try {
                await courseService.delete(courseId);
                res.status(200).json({ message: 'Success deleted course!' });
        } catch (error) {
               res.status(400).json(error.message);
        }

});

// EDIT
router.put('/:courseId', async (req, res) => {
       const { courseId } = req.params;
       const currentUser = req.user._id;
       const { courseName, category, description, startDate, endDate } = req.body;
        

    try {
                const courseData = {
                        courseName, 
                        category,
                        description, 
                        startDate,
                        endDate,
                };

                const courseOwner = await courseService.checkCourseOwner(courseId);

                if(courseOwner.toString() !== currentUser.toString()) {
                        throw new Error('You have no permission to edit this course!');
                }

               await courseService.update(courseId, courseData);
                        
               res.status(201).json({ message: 'Updated course!' }); 

        } catch (error) {
            res.status(400).json(error.message);
        }
});

module.exports = router;