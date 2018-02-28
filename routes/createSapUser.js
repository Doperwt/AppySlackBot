const router = require('express').Router()
const SapUser = require('../models/sapUser')

router
  .post('/api/sapuser', (req, res, next) => {
    const data = req.body.text
    let [code, user] = data.split(':')

    code = code.trim()
    user = user.trim()

    console.log(code, user)
    console.log('hsdfjkhskdfjhksdhfksdkjfkshdkfhsdhfkshjk')


    if(!user || !code) {
      const err = new Error('User/Code not existent!')
      err.status = 422
      next(err)
    }

    SapUser.find({code: code})
      .then((sapUser) => {
        console.log(sapUser)

        if(!sapUser) {
          const newSapUser = new SapUser({name: user, code: code})
          newSapUser.save((error) => {
            const err = new Error(error)
            err.status = 422
            next(err)
          })
        } else {
          sapUser.name = user

          sapUser.save((error) => {
            if(error) {
              const err = new Error(error)
              err.status = 422
              next(err)
            }
          })
        }

        res.send(sapUser)
      })
  })

module.exports = router
