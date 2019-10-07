const express = require('express')

// database access using knex
const db = require('../data/dbConfig')

const router = express.Router()

router.get('/', (req, res) => {
  db.select('*')
    .from('accounts')
    .then((accounts) => {
      res.status(200).json(accounts)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db('accounts')
    .where({ id }) // always returns an array
    .first() // returns first item in the returned array
    .then((account) => {
      res.status(200).json(account)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.post('/', (req, res) => {
  const newAccount = req.body
  // validate the postData before inserting into db
  db('accounts')
    .insert(newAccount, 'id')
    .then(([id]) => {
      db('accounts')
        .where({ id })
        .first()
        .then((account) => {
          res.status(200).json(account)
        })
    })
    .catch((err) => {
      res.json(err)
    })
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      res.status(200).json({ message: `deleted ${count} records` })
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router
