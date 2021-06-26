const express = require("express")

const connect = require("./db/mongoose")
const userRouter = require('./routers/user-routers')
const taskRouter = require('./routers/task-routers')

connect()

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is up and running " + PORT);
});

