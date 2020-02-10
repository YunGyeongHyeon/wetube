//Global
const HOME = '/'
const JOIN = '/join'
const LOGIN = '/login'
const LOGOUT = '/logout'
const SEARCH = '/search'

// User

const USERS = '/users'
const USER_DETAIL = '/:id'
const EDIT_PROFILE = '/edit-profile'
const CHANGE_PASSWORD = '/change-password'

//Videos

const VIDEOS = '/videos'
const UPLOAD = '/upload'
const VIDEO_DETAIL = '/:id'
const EDIT_VIDEO = '/:id/edit'
const DELETE_VIDEO = '/:id/delete'

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,

  users: USERS,
  userDetail: USER_DETAIL,
  editProfile: id => {
    if (id) {
      console.log(id + '왜 안나와')
      return `/users/edit-profile`
    } else {
      return EDIT_PROFILE
    }
  },
  changePassword: CHANGE_PASSWORD,

  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: id => {
    if (id) {
      return `/videos/${id}`
    } else {
      return VIDEO_DETAIL
    }
  },
  editVideo: id => {
    if (id) {
      return `/videos/${id}/edit`
    } else {
      return EDIT_VIDEO
    }
  },
  deleteVideo: id => {
    if (id) {
      return `/videos/${id}/delete`
    } else {
      return DELETE_VIDEO
    }
  }
}

export default routes
