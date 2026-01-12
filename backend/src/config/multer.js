import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const MAX_SIZE = 10* 1024* 1024
const allowedTypes = [".pdf", ".docx"]

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function(error, name) {
        if (error){
             return cb(error)
        }
        const fn = name.toString("hex") + path.extname(file.originalname)
        cb(null, fn)
    })
  }
})

const fileFilter = (req, file, cb) => {

  const ext = path.extname(file.originalname).toLowerCase()

  if(!allowedTypes.includes(ext)){
    return cb(
      new Error("Only PDF and DOCX files are allowed"),
      false
    )
  }

  cb(null, true)

}

const upload = multer({ storage: storage,
  limits : {fieldSize : MAX_SIZE},
  allowedTypes
 })

export default upload
