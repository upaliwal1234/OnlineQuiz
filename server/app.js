const express = require('express')
const app = express()
const path = require('path')
const Quiz = require('./model/Quiz')
const mongoose = require('mongoose')
const Question = require('./model/Question')
const User = require('./model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require('cors')
const loginSignupRoutes = require('./routes/loginSignupRoutes')
const quizRoutes = require('./routes/Quiz')
const userRoutes = require('./routes/user')
const questionRoutes = require('./routes/question')
const methodOverride = require('method-override');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors())
app.use(loginSignupRoutes);
app.use(quizRoutes);
app.use(userRoutes);

app.use(questionRoutes);

mongoose.connect(process.env.MongoDB_URI)
    .then(() => { console.log('DB connected'); })
    .catch((err) => { console.log('error in connecting to DB', err); })



// -------------Deployment----------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname1, './Frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "./Frontend", "dist", "index.html"));
    })
}
else {
    app.get('/', (req, res) => {
        res.send('you are at root route')
    })
}

// -------------Deployment----------------


app.get('/quizes', async (req, res) => {
    const quizzes = await Quiz.find().populate('questions');
    res.send(quizzes);
})

app.get('/questions', async (req, res) => {
    const questions = await Question.find({});
    res.send(questions);
})


const PORT = process.env.PORT;
// console.log(PORT);
app.listen(PORT, (err) => {
    console.log(`server is connected at port ${PORT}`);
})
app.use(cookieParser())