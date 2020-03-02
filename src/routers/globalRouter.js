import express from 'express'
import routes from '../routes'
import passport from 'passport'
import { home, search } from '../controller/videoController'
import {
  getJoin,
  getLogin,
  postLogin,
  logout,
  postJoin,
  githubLogin,
  postGithubLogIn,
  getMe,
  facebookLogin,
  postFacebookLogin
} from '../controller/userController'
import { onlyPublic, onlyPrivate } from '../middlewares'

const globalRouter = express.Router()

globalRouter.get(routes.join, onlyPublic, getJoin)
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin)

globalRouter.get(routes.login, onlyPublic, getLogin)
globalRouter.post(routes.login, onlyPublic, postLogin)

globalRouter.get(routes.home, home)
globalRouter.get(routes.logout, onlyPrivate, logout)
globalRouter.get(routes.search, search)

globalRouter.get(routes.github, githubLogin)

globalRouter.get(
  routes.githubCallback,
  passport.authenticate('github', { failureRedirect: '/login' }),
  postGithubLogIn
)

globalRouter.get(routes.me, getMe)

globalRouter.get(routes.facebook, facebookLogin)
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  postFacebookLogin
)

export default globalRouter
