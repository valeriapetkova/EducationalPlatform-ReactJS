const router = require('express').Router();

// const courseController = require('./controllers/courseController');
// const commentController = require('./controllers/commentController');
// const topicController = require('./controllers/topicController');
// const participantController = require('./controllers/participantController');
const userController = require('./controllers/userController');
// const { attachCourseId } = require('./middlewares/attachCourseIdMiddleware');
// const { isAuth } = require('./middlewares/authMiddleware');


router.get('/', (req, res) => {
    res.send('Server is running');
});

//router.use(homeController);
// router.use('/courses', courseController);
// router.use(`/courses/:courseId/comments`, (req, res, next) => {
//     const courseId = req.params.courseId;
//     req.courseId = courseId;
//     console.log('courseId', courseId);
//     next()
// }, commentController);

// router.use(`/courses/:courseId/topics`, attachCourseId, topicController);
// router.use(`/courses/:courseId/participants`, isAuth, attachCourseId, participantController);

router.use('/users', userController);

module.exports = router;
