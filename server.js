const express = require('express');
const server = express();

const accountsRouter = require('./accounts/account-router')

server.use(express.json());
server.use('/api/accounts', accountsRouter)

server.get('/', (req, res) => {
  res.send('<h3>DB Helpers with knex</h3>')
})

module.exports = server;
