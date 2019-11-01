const express = require('express');
const cors = require('cors')
const server = express()
server.use(cors())

server.get('/', (req, res) => {
    res.status(200).json("Get run succssefully")
})

module.exports = server;