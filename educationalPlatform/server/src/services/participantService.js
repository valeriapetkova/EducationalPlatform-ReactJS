const Course = require('../models/Course');

exports.joinCourse = async (courseId, userId) => {
    const joinedUser = await Course.findByIdAndUpdate(courseId, { $push: { participants: userId }});

    return joinedUser;
}