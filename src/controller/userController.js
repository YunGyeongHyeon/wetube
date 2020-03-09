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

export const getLogin = (req, res) => {
  res.render('login', { pageTitle: 'Login' })
}
export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home
})

export const githubLogin = passport.authenticate('github')

export const githubLoginCallback = async (__, ___, profile, cb) => {
  const {
    _json: { id, avatar_url, username, email }
  } = profile
  console.log('깃허브 가입한 사람의 정보  : ' + profile)
  console.log('깃허브 가입한 사람 이름  : ' + username)
  try {
    const user = await User.findOne({ email })
    if (user) {
      user.githubId = id
      user.username
      user.save()
      return cb(null, user)
    }
    const newUser = await User.create({
      email,
      name: username,
      githubId: id,
      avatarUrl: avatar_url
    })
    return cb(null, newUser)
  } catch (error) {
    return cb(error)
  }
}

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home)
}

export const facebookLogin = passport.authenticate('facebook')

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email }
  } = profile
  try {
    const user = await User.findOne({ email })
    if (user) {
      user.facebookId = id
      user.save()
      return cb(null, user)
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    })
    return cb(null, newUser)
  } catch (error) {
    return cb(error)
  }
}

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home)
}

export const logout = (req, res) => {
  // To Do: Process Log Out
  req.logout()
  res.redirect(routes.home)
}
export const getEditProfile = (req, res) =>
  res.render('editProfile', { pageTitle: 'Edit Profile' })

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl
    })
    res.redirect(routes.me)
  } catch (error) {
    res.render('editProfile', { pageTitle: 'Edit Profile' })
  }
}

export const getMe = async (req, res) => {
  res.render('userDetail', { pageTitle: 'Users Profile', user: req.user })
}
export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req
  try {
    const user = await User.findById(id).populate('videos')
    console.log(user)
    res.render('userDetail', { pageTitle: `Users Profile`, user })
  } catch (error) {
    res.redirect(routes.videoDetail)
  }
}

export const getChangePassword = (req, res) => {
  res.render('changePassword', { pageTitle: 'ChangePassword' })
}

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req
  try {
    if (newPassword !== newPassword1) {
      res.status(400)
      res.redirect(`/users${routes.changePassword}`)
      return
    }
    await req.user.changePassword(oldPassword, newPassword)
    res.redirect(routes.me)
  } catch (error) {
    res.status(400)
    res.redirect(`/users${routes.changePassword}`)
  }
}
