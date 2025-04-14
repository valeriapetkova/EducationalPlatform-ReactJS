const router = require('express').Router();

const courseService = require('../services/courseService');
const userService = require('../services/userService');
const participantService = require('../services/participantService');

router.get('/', async (req, res) => {
        const courseId = req.courseId;
        const currentUser = req.user._id;

        try {
                const courseOwner = await courseService.checkCourseOwner(courseId);
                                              
                if(courseOwner.toString() !== currentUser.toString()) {
                        throw new Error('You have no permission to see participants!');
                }

                const participants = await courseService.getOneWithParticipants(courseId);
                
                res.status(200).json(participants.participants);

        } catch (error) {
                res.status(400).json(error.message);
        }
});

router.post('/join-course', async (req, res) => {
    const courseId = req.courseId;
    const userId = req.user._id;

    try {

            const course = await courseService.getOne(courseId);

            if (!course) {
                    return res.status(404).json({message: 'Course not found'});
            }

            const user = await userService.getUserInfo(userId);

            if (!user) {
                    return res.status(404).json({message: 'User not found'});
            }

            if (course.participants.includes(userId)) {
                    return res.status(400).json({message: 'User is already a participant'});
            }

            const joinedParticipant = await participantService.joinCourse(courseId, userId);

            res.status(200).json({ message: 'User added to course successfully'});

    } catch (error) {
            res.status(400).json(error.message);
    }
});

module.exports = router;