const http = require('http')
const express = require('express')
// const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const config = require('./utils/config')
const app = require('./app')

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})