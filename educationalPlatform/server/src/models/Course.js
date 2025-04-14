const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String, 
        trim: true,
        required: [true, 'Name is required'],
    }, 
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'], 
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
    },
    participants: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    topics: [{
        type: mongoose.Types.ObjectId,
        ref: 'Topic'
    }],
    comments: [{
       type: mongoose.Types.ObjectId,
       ref: 'Comment'
    }],
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;