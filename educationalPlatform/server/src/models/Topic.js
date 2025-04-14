const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Title is required'],
    }, 
    description: {
        type: String, 
        required: [true, 'Description is required'],
    }, 
    date: {
        type: Date, 
        required: [true, 'Date is required'],
    }, 
    time: {
        type: String, 
        required: [true, 'Time is required'],
    }, 
    link: {
        type: String, 
        required: [true, 'Link is required'],
    }, 
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;