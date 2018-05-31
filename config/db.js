const mongoose = require('mongoose')


mongoose.connection.openUri(process.env.DB_URL)
  .once('open', () => console.log('Connected to database...'))
  .on('error', (err) => {
    console.log(`Error: ${err}`)
  })

