const app = require('./app.js')
const { connectDB } = require('./db.js')

connectDB()
app.listen(4000)
console.log('server on port', 4000);