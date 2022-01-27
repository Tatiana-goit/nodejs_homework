const { sendSuccessRes } = require('../../helpers')
const { BadRequest, Unauthorized } = require('http-errors')
const { User } = require('../../models')

const { sendEmail } = require('../../helpers')

const verify = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email }, 'verify verificationToken')
  if(!email) {
    throw new BadRequest('missing required field email')
  }
  if (!user) {
    throw new Unauthorized('Email or password is wrong')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const emailForVerification = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a href='http://localhost:5000/api/v1/auth/verify/' target="_blank">Подтверждение регистрации </a>`,
  }

  await sendEmail(emailForVerification)
  await User.findByIdAndUpdate(user._id,{verificationToken: null, verify: true})
  sendSuccessRes(res, 'Verification successful')
}

module.exports = verify