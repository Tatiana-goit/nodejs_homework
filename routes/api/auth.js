const express = require('express')
const {
  controllerWrapper,
  validation,
  authenticate,
  uploadMiddleware
} = require('../../middlewares')
const authController = require('../../controllers/auth')
const { userJoiSchema } = require('../../models/user')

const router = express.Router()

router.post(
  '/register',
  validation(userJoiSchema),
  controllerWrapper(authController.register),
)

router.get('/verify/:verificationToken', controllerWrapper(authController.verify))

router.post(
  '/login',
  validation(userJoiSchema),
  controllerWrapper(authController.login),
)

router.get('/logout', authenticate, controllerWrapper(authController.logout))

router.get('/current', authenticate, controllerWrapper(authController.current))

router.patch('/avatars', authenticate, uploadMiddleware.single('avatar'), controllerWrapper(authController.avatars),
)

module.exports = router
