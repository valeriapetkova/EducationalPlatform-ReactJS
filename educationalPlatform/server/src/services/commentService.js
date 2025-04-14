const Comment = require('../models/Comment');
const Course = require('../models/Course');

exports.getAll = (courseId) => Comment.findById(courseId);

exports.create = async (commentData) => {

    const comment = await Comment.create(commentData);

    await Course.findByIdAndUpdate(commentData.courseId, { $push: { comments: comment._id }})
    
    return comment;
}

exports.update = (commentId, commentData) => Comment.findByIdAndUpdate(commentId, commentData);

exports.delete = async (commentId, courseId) => {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, { $pull: { comments: commentId }});

    await Comment.findByIdAndDelete(commentId);
}

exports.checkCommentOwner = async (commentId) => {
    const comment = await Comment.findById(commentId);
    const commentOwner = comment?._ownerId;
    
    return commentOwner;
}