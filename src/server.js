const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')

let app = express()
app.use(cors())
app.use(bodyParser.json())

// For ease of this tutorial, we are going to use SQLite to limit dependencies
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite'
})

// Define our User model
// name, email, rfid_key, karma, credit_debit
let User = database.define('users', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  rfid_key: Sequelize.STRING,
  karma: Sequelize.TINYINT,
  credit_debit: Sequelize.DECIMAL
})

// Define our Product model
// id, createdAt, and updatedAt are added by sequelize automatically
let Product = database.define('products', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  calories: Sequelize.TINYINT,
  price: Sequelize.DECIMAL,
  amount: Sequelize.TINYINT,
  karma: Sequelize.TINYINT
})

// Define our Transaction model
let Ledger = database.define('ledger', {
  amount: Sequelize.DECIMAL,
  date: Sequelize.DATE
})
Ledger.belongsTo(User)
Ledger.belongsTo(Product)

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
})

app.post('/current_user/:rfid', function (req, res) {
  console.log(req.params.rfid)
  res.send('Successful POST request to the homepage')
})

// Create the dynamic REST resource for our Post model
let productResource = epilogue.resource({
  model: Product,
  endpoints: ['/products', '/products/:id']
})

let shopResource = epilogue.resource({
  model: User,
  endpoints: ['/users', '/users/:id']
})

let ledgerRessource = epilogue.resource({
  model: Ledger,
  endpoints: ['/ledger', '/ledger/:id']
})

// Resets the database and launches the express app on :8081
database
  .sync({ force: true })
  .then(() => {
    app.listen(8081, () => {
      console.log('listening to port localhost:8081')
    })
  })
