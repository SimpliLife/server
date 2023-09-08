if (process.env.NODE_ENV !== 'production') require("dotenv").config()

const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api", require("./routes/index"))

module.exports = app