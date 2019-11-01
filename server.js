const express = require('express');
const cors = require('cors')
const server = express()
const actionRouter = require('./actions/actionRouter')
const projectRouter = require('./projects/projectRouter')

server.use(cors())

server.get('/', (req, res) => {
    res.status(200).json("Get run succssefully")
})
server.use(express.json());
server.use('/api/action', actionRouter)
server.use('/api/project', projectRouter)

module.exports = server;