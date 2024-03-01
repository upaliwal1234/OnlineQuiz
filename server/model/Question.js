const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    desc: {
        type: String,
        require: true
    },
    quesNum: {
        type: Number,
        require: true
    },
    options: {
        type: Array,
        require: true,
        minlength: 2
    },
    answer: {
        type: String,
        require: true
    }
})

const Question = mongoose.model("Question", questionSchema);
module.exports = Question