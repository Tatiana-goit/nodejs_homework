const { Schema, model } = require('mongoose')
const gravatar = require('gravatar')
const Joi = require('joi')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function(){
        return gravatar.url(this.email, {s: '250'}, true)
      },
    },
    // idAvatarCloud: {
    //   type: String,
    //   default: null,
    // },
  },
  { versionKey: false, timestamps: true },
)

const userJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const User = model('user', userSchema)

module.exports = { userJoiSchema, User }
