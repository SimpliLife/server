const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => res.send("This API is developed by SimpliLife"))
app.use("/api", require("./routes/index"))

app.use((err, req, res, next) => {
  let code = err.code
  let message = ""
  switch (code) {
    case 400:
      message = "Bad request"
      break;
    case 404:
      message = "Data not found"
      break;
    default:
      code = 500
      message = "Internal server error"
      break;
  }
  res.status(code).json({ message })
})

module.exports = app