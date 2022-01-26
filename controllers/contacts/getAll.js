const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const getAll = async (req, res) => {
  // const result = await Contact.find({}, "_id name email phone favorite")
  const { page = 1, limit = 12 } = req.query
  const skip = (page - 1) * limit
  const { _id } = req.user
  const { favorite } = req.query
  const result = await Contact.find(
    favorite ? { owner: _id, favorite } : { owner: _id },
    null,
    { skip, limit: +limit },
  ).populate({
    path: 'owner',
    select: '_id email',
  })
  sendSuccessRes(res, { result })
}

module.exports = getAll
