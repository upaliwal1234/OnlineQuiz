const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    ttlQues: {
        type: Number,
    },
    time: {
        type: Number,
        min: 1,
        required: true
    },
    questions: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Question",
        }
    ],
    quizCode: {
        type: String,
        required: true
    }
})

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;