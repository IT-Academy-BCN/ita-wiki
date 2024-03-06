import multer from '@koa/multer'
import { UnsupportedMediaType } from '../helpers/errors'

// Only allows images <=2MB
export const uploadImage = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.split('/')[0] === 'image') cb(null, true)
    else cb(new UnsupportedMediaType('File must be an image'), false)
  },
  limits: {
    fileSize: 2000000,
  },
})
