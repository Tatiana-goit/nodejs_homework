const { sendSuccessRes } = require('../../helpers')
const bcrypt = require('bcrypt')
const { generate } = require('shortid')
const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Already register',
    })
  }

  const verificationToken = generate()
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const newUser = {
    email,
    verificationToken,
    password: hashPassword,
  }
  const result = await User.create(newUser)

  const emailForVerification = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a href='http://localhost:5000/api/v1/auth/verify/${verificationToken}' target="_blank">Подтверждение регистрации </a>`,
  }
  await sendEmail(emailForVerification)

  sendSuccessRes(res, { result })
}

module.exports = register
