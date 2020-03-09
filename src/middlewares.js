import routes from './routes'
import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  accessKeyId: process.env.AWS_KEY,
  region: 'ap-northeast-1'
})

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'wetube-y/video'
  })
})
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'wetube-y/avatar'
  })
})

export const uploadVideo = multerVideo.single('videoFile')
export const uploadAvatar = multerAvatar.single('avatar')

export const localsMiddelware = (req, res, next) => {
  res.locals.siteName = 'WeTube'
  res.locals.routes = routes
  console.log(req.params)
  res.locals.loggedUser = req.user || req.username || ''
  next()
}

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home)
  } else {
    next()
  }
}

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.redirect(routes.home)
  }
}
