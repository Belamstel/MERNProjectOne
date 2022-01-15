const express = require ('express')
const config = require ('config')
const mongoose = require ('mongoose')

const app = express()

app.use('/api/auth', require('./routes/auth.routs'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlPaser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (error) {
        console.log('Server Error', error.message)
        process.exit(1)
    }
}



app.listen(PORT, () => console.log('Server started on port ' + PORT))