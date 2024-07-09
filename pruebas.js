import express from 'express'
import jwt from 'jsonwebtoken'

const users = [
  { id: 1, name: 'juanito' },
  { id: 2, name: 'fanny' },
  { id: 3, name: 'mishu' }
]

const app = express()

const secretkey = 'Secretito'
const token = jwt.sign(
  users[0],
  secretkey,
  { expiresIn: 20 }
)

app.get('/', (req, res) => {
  res.send(token)
})

app.get('/:token', (req, res) => {
  const { token } = req.params
  jwt.verify(token, secretkey, (err, decod) => {
    if (err) { return res.status(400).send('Token Invalido') }
    return res.json(decod)
  })
  res.send(token)
})

jwt.verify(token, secretkey, (err, decoded) => {
  if (err) { return console.log(err) }
  console.log(decoded)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => { `🔥 Listening on port ${PORT}` })
