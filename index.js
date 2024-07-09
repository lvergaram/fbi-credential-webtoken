import express from 'express'
import 'dotenv/config'
import userRouter from './src/user.routes.js'

const app = express()

const __dirname = import.meta.dirname
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.use('/user', userRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log(`🔥 Listening on port ${PORT}`) })
