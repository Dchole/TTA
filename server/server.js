const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 5000

require("dotenv").config()

const tasks = require("./routes/api/tasks")

// Middlewares
app.use(express.json())

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to Database!"))
  .catch(err => console.log(err))

// Routes Middlewares
app.use("/api/tasks", tasks)

app.listen(PORT, () => console.log(`App running on port ${PORT}`))
