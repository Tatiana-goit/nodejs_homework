const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../', 'temp')

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    filesize: 50000,
  },
})

const uploadMiddleware = multer({
  storage: uploadConfig,
})

module.exports = uploadMiddleware

//   app.post(
//     '/api/products',
//     uploadMiddleware.single('image'),
//     async (req, res) => {
//       console.log(req.body)
//       const { originalname, path: tempName } = req.file
//       const fileName = path.join(uploadDir, 'products', originalname)
//       try {
//         await fs.rename(tempName, fileName)
//         const image = path.join('public/products', originalname)
//         const newProduct = { ...req.body, image  }
//         products.push(newProduct)
//         // res.status()
//       } catch (error) {
//         await fs.unlink(tempName)
//       }
//     },
//   )
