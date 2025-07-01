const express = require("express");
const app = express();
const dbConnect = require('./db')
const passport = require('./auth')


//midellwear
app.use(express.json());
app.use(passport.initialize())

const authentication = passport.authenticate('local', {session: false})

//importing routes
const taskRouter = require('./router/taskRouter');
const user = require('./router/userRouter');

//routes
app.use('/', authentication, taskRouter)
app.use('/',user)

PORT = process.env.PORT || 3000;
dbConnect().then(
  app.listen(PORT, () => {
    console.log("server is runing on port: 3000");
  })
);











