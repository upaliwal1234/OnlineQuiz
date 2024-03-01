const mongoose = require('mongoose')

const quizResultSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Types.ObjectId,
        ref: "Quiz"
    },
    userId: {
        type: mongoose.Types.ObjectId
    },
    quizCode: {
        type: String
    },
    ttlQues: {
        type: Number
    },
    correctQues: {
        type: Number,
        min: 0,
        required: true
    }
})

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;