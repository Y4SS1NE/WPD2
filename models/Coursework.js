const mongoose = require('mongoose');

const CourseworkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    courseTitle: {
        type: String,
        required: true,
        trim: true
    },
    module: {
        type: String,
        required: true
    },
    milestones: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Completed', 'Not Completed'],
        default: 'Not Completed',
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Coursework', CourseworkSchema);