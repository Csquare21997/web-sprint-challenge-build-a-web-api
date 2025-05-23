const express = require('express');
const server = express();

const actionRouter = require('./actions/actions-router.js')
const ProjectRouter = require('./projects/projects-router')
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json())


server.use('/api/actions',actionRouter)

server.use('/api/projects', ProjectRouter)

module.exports = server;




// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

