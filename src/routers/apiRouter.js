import express from 'express'
import routes from '../routes'
import { psotRegisterView, postAddComment } from '../controller/videoController'

const apiRouter = express.Router()

apiRouter.post(routes.registerView, psotRegisterView)
apiRouter.post(routes.addComment, postAddComment)

export default apiRouter
