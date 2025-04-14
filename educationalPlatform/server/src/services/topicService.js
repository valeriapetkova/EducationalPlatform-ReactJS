const Course = require('../models/Course');
const Topic = require('../models/Topic');

exports.create = async (topicData) => {
    const topic = await Topic.create(topicData);

    await Course.findByIdAndUpdate(topicData.courseId, { $push: { topics: topic._id }})

    return topic;
}

exports.update = (topicId, topicData) => Topic.findByIdAndUpdate(topicId, topicData);

exports.delete = async (topicId, courseId) => {
    
    const updatedCourse = await Course.findByIdAndUpdate(courseId, { $pull: { topics: topicId }});
    
    if (!updatedCourse) {
        return res.status(404).json({ message: 'Course not found'});
    }
    
    await Topic.findByIdAndDelete(topicId);
}

exports.checkTopicOwner = async (topicId) => {
    const topic = await Topic.findById(topicId);
    const topicOwner = topic?._ownerId;
    
    return topicOwner;
}