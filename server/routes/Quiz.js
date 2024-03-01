const express = require('express');
const Quiz = require('../model/Quiz');
const Question = require('../model/Question');
const User = require('../model/User')
const QuizResult = require('../model/QuizResult');
const router = express.Router(); //mini instance/application;
const bodyParser = require('body-parser');
const cors = require('cors')//to handle the different domains


router.use(cors())
//route to create the Quiz
router.post('/Quiz', async (req, res) => {
    //console.log("Hello from response")
    //get all data from body
    const { title, time, quizCode, userId } = req.body;
    //check if all data exists
    if (!(title && time)) {
        console.log("All Fields Are Necessary")
        return res.status(400).send("All Fields are necessary");
    }
    let user = await User.findById(userId);
    let quiz = new Quiz({ title, time, quizCode });
    user.quizCreated.push(quiz);
    await user.save();
    await quiz.save();
    return res.status(200).json(quiz);
})

router.patch('/Quiz/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const { title, time } = req.body;
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        quiz.title = title;
        quiz.time = time;
        quiz.save();
        return res.status(200).json(quiz);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
})

//route to add the question of a particular quiz
router.post('/Quiz/:quizCode/question', async (req, res) => {
    let { quizCode } = req.params;
    let { desc, quesNum, options, answer } = req.body;
    if (!(desc && quesNum && options && answer)) {
        console.log("All Fields Are Necessary")
        return res.status(400).send("All Fields are necessary");
    }
    let quiz = await Quiz.find({ "quizCode": quizCode });
    let question = new Question({ desc, quesNum, options, answer });
    quiz[0].questions.push(question);
    const newQuiz = await quiz[0].save();
    await question.save();
    return res.status(200).json(newQuiz);
})

//route to check the QuizCode entered by the user.
router.get('/Quiz/:quizCode', async (req, res) => {
    const { quizCode } = req.params;
    try {

        const response = await Quiz.find({ "quizCode": `${quizCode}` }).populate('questions');
        if (response.length != 0) {
            return res.status(200).json(response);
        }
        return res.status(404).json({ message: "Quiz not found" });
    }
    catch {
        return res.status(500).json({ message: 'Internal server error' });
    }
})

//route to display the question when quiz is display.

router.get('/QuizDisplay/:quizId', async (req, res) => {
    const { quizId } = req.params;
    const response = await Quiz.findById(quizId);
    if (!response) {
        return res.status(404).json({ message: 'Quiz not found' });
    }
    return res.json(response);
})

router.post('/getQuestions', async (req, res) => {
    //console.log(req.body.quesIds)
    const quesIds = req.body.quesIds;
    const quizQuestions = []
    await Promise.all(quesIds.map(async (id) => {
        const question = await Question.findById(id);
        quizQuestions.push(question)
    }))
    return res.json(quizQuestions);
})

router.post('/Quiz/QuizResult/new', async (req, res) => {
    const { quizId, userId, ttlQues, correctQues } = req.body;
    let quiz = await Quiz.findById(quizId);
    let user = await User.findById(userId);
    let quizCode = quiz.quizCode;
    let quizResult = new QuizResult({ quizId, userId, quizCode, ttlQues, correctQues });

    user.quizPlayed.addToSet(quiz);
    user.quizResult.push(quizResult)
    await user.save();
    await quizResult.save();
    return res.status(200).json(quizResult);
})

router.get('/QuizResult/:userId/:quizCode', async (req, res) => {
    const { userId, quizCode } = req.params;
    try {
        let results = await QuizResult.find({ userId: userId, quizCode: quizCode }).populate("quizId");
        if (results) {
            return res.status(200).json(results);
        }
        return res.status(404).json({ message: "Results Not Found" });

    } catch (error) {
        return res.status(500).json({ error })
    }
})



module.exports = router