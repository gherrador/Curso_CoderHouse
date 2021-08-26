const { PORT } = require('./config/globals')
const app = require('./server')

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})