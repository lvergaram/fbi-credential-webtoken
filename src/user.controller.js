import { userModel } from './user.model.js'
import jwt from 'jsonwebtoken'
import path from 'path'

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.getOne(email)

    if (!user || user.password !== password) {
      return res.status(400).send({ ok: false, msg: 'Datos Incorrectos' })
    }

    // token
    const token = jwt.sign(
      user,
      process.env.JWT_SECRET,
      { expiresIn: 120 }
    )

    return res.send(`
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FBI System</title>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
      </head>

      <body>
      
        <h1>&#128374; FBI System &#128374;</h1>
        <div class="card bg-dark text-center">
          <div class="card-body">
            <h5 class="card-title text-center">Correo: ${user.email}</h5>
            <h5 class="card-title text-center">Ingrese aquí <a href='/user/restringido/${token}'>acceso restringido</a></h5>
          </div>
        </div>

        <style>
          * {
            margin: 0;
            padding: 0;
          }

          body {
            background: black;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 60vh;
          }
        </style>
        
      </body>

      </html>  
    `)
  } catch (error) {
    console.log(error)
    return res.status(500).send({ ok: false, msg: 'Error de servidor' })
  }
}

const restringido = async (req, res) => {
  console.log('restringidoo....')
  try {
    const { token } = req.params
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) return res.status(400).json({ ok: false, msg: 'usuario no autorizado' })
      return res.send(`
    
        <!DOCTYPE html>
        <html lang="en">

        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>FBI System</title>

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        </head>

        <body>
          <h1>&#128374; FBI System - TABLERO RESTRINGIDO&#128374;</h1>
          <div class="card bg-dark text-center">
            <div class="card-body">
              <h5 class="card-title text-center">Bienvenido!<span id="userEmail">${data.email}</span></h5>
            </div>
          </div>

          <style>
            * {
              margin: 0;
              padding: 0;
            }

            body {
              background: black;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              height: 60vh;
            }
          </style>
          <script>

          </script>
        </body>

        </html>
    
        `)
    })
  } catch (error) {

  }
}

export const userController = {
  login,
  restringido
}
