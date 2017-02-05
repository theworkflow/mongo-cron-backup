const { Server } = require('hapi')

const { host, port } = require('../config')
const Routes = require('./routes')

const server = new Server()

server.connection({ host, port })
server.route(Routes)

module.exports = server
