const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true,
        unique: true
    },
    credits: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    StartingFrom:{
        type: String,
        required: true
    },
    LastDateToRegister: {
        type:String,
        required:true
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty', // Reference to an faculty model
        required: true
    },

    syllabus: {
        type: String // Could also be a link to a file or a PDF
    },
    enrollmentLimit: {
        type: String
    },
    
    semester: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update `updatedAt` before saving
courseSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
