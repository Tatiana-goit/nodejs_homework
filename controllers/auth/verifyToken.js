const { sendSuccessRes } = require('../../helpers')
const { NotFound } = require('http-errors')
const { User } = require('../../models')

const verifyToken = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })

  if (!user) {
    throw new NotFound('Verify error')
    
  }
  await User.findByIdAndUpdate(user._id,{verificationToken: null, verify: true})
  sendSuccessRes(res, 'Verification successful')
}


module.exports = verifyToken
