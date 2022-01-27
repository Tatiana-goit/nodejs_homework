const { BadRequest } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')
const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password verify')
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new BadRequest('Invalid email or password')
  }
  if (!user.verify) {
    throw new BadRequest('email not verify')
  }

  const { _id } = user
  const payload = {
    _id,
  }

  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(_id, { token })
  sendSuccessRes(res, { token })
}

module.exports = login
