import passport from 'passport'
import routes from '../routes'
import User from '../models/User'
export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' })
}

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req
  if (password !== password2) {
    res.status(400)
    res.render('join', { pageTitle: 'Join' })
  } else {
    try {
      const user = await User({
        name,
        email
      })
      await User.register(user, password)
      next()
    } catch (error) {
      //To Do : Loguser In
      res.redirect(routes.home)
    }
  }
}

export const getLogin = (req, res) =>
  res.render('login', { pageTitle: 'Login' })

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home
})

export const logout = (req, res) => {
  // To Do: Process Log Out
  req.logout()
  res.redirect(routes.home)
}
export const userDetail = (req, res) =>
  res.render('userDetail', { pageTitle: 'UserDetail' })

export const editProfile = async (req, res) => {
  const {
    params: { user }
  } = req
  console.log(req.user + '여긴 어디지')
  try {
    const profile = await User.findById(req.user)
    res.render('editProfile', { pageTitle: `Edit ${User.email}`, profile })
    console.log(user + '아이디')
    console.log(profile + '프로필')
  } catch (error) {
    res.redirect(routes.home)
  }
}

export const changePassword = (req, res) =>
  res.render('changePassword', { pageTitle: 'ChangePassword' })
