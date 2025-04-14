const Comment = require('../models/Comment');
const Course = require('../models/Course');
const Topic = require('../models/Topic');
// const User = require('../models/User');

exports.getAll = async () => {
    let result = await Course.find().lean();

    return result;
}

exports.getSearchedCourses = async (search) => {
    const result = await Course.find({ courseName: { $regex: search, $options: 'i' } });
    return result;
}

exports.getOne = (courseId) => Course.findById(courseId);
exports.getOneWithComments = (courseId) => this.getOne(courseId).populate('comments');
exports.getOneWithTopics = (courseId) => this.getOne(courseId).populate('topics');
exports.getOneWithParticipants = (courseId) => this.getOne(courseId).populate('participants');

exports.create = (courseData) => {
    const course = Course.create(courseData);

    return course;
}

exports.update = (courseId, courseData) => Course.findByIdAndUpdate(courseId, courseData);

exports.delete = async (courseId) => {
    const course = await Course.findById(courseId)
    const deletedComments = await Comment.deleteMany({ _id: {$in: course.comments } });
    const deletedTopics = await Topic.deleteMany({ _id: {$in: course.topics } });
    const result = await Course.deleteOne({ _id: courseId});
    return result;
}

exports.getMyCourses = async (currentUser) => {
    const courses = await Course.find({ _ownerId: currentUser });

    return courses;
}

exports.getPopularCourses = async () => {
    const popularCourses = await Course.aggregate([
        {
            $project: {
                courseName: 1,
                category: 1,
                description: 1,
                startDate: 1,
                endDate: 1,
                participantCount: {$size: "$participants"}
            }
        },
        {
            $sort: { participantCount: -1 }
        },
        {
            $limit: 3
        }
    ]);

    return popularCourses;
}

exports.checkCourseOwner = async (courseId) => {
    const course = await Course.findById(courseId);
    const courseOwner = course?._ownerId;
    
    return courseOwner;
}
