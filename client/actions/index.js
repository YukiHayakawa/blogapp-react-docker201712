export const actionTypes = {
  BLOG_LOAD_FAILURE: 'BLOG_LOAD_FAILURE',
  BLOG_LOAD: 'BLOG_LOAD',
  BLOG_LOAD_SUCCESS: 'BLOG_LOAD_SUCCESS',
  USERS_LOAD_FAILURE: 'USERS_LOAD_FAILURE',
  USERS_LOAD: 'USERS_LOAD',
  USERS_LOAD_SUCCESS: 'USERS_LOAD_SUCCESS',
  USERS_BLOG_LOAD_FAILURE: 'USERS_BLOG_LOAD_FAILURE',
  USERS_BLOG_LOAD: 'USERS_BLOG_LOAD',
  USERS_BLOG_LOAD_SUCCESS: 'USERS_BLOG_LOAD_SUCCESS',
  SET_SESSION: 'SET_SESSION',
  REMOVE_SESSION: 'REMOVE_SESSION',
  REMOVE_SESSION_SUCCESS: 'REMOVE_SESSION_SUCCESS',
  REMOVE_SESSION_FAILURE: 'REMOVE_SESSION_FAILURE',
  CHANGE_AUTH_FLG: 'CHANGE_AUTH_FLG',
  CHANGE_FORMDATA: 'CHANGE_FORMDATA',
  GET_HOGE: 'GET_HOGE',
  GET_HOGE_SUCCESS: 'GET_HOGE_SUCCESS',
  CHANGE_BLOG_FLG: 'CHANGE_BLOG_FLG',
  CHANGE_IMAGEVIEWER: 'CHANGE_IMAGEVIEWER',
  CHANGE_FORM_EDITDATA: 'CHANGE_FORM_EDITDATA',
  CHANGE_FORM_INITDATA: 'CHANGE_FORM_INITDATA',
}

export function getBlogListFailure (error) {
  return {
    type: actionTypes.BLOG_LOAD_FAILURE,
    error
  }
}

export function getBlogList(requestHost) {
  return {
    type: actionTypes.BLOG_LOAD,
    requestHost
  }
}

export function getBlogListSuccess(blog) {
  return {
    type: actionTypes.BLOG_LOAD_SUCCESS,
    blog
  }
}

export function getUsersListFailure (error) {
  return {
    type: actionTypes.USERS_LOAD_FAILURE,
    error
  }
}

export function getUsersList(requestHost) {
  return {
    type: actionTypes.USERS_LOAD,
    requestHost
  }
}

export function getUsersListSuccess(users) {
  return {
    type: actionTypes.USERS_LOAD_SUCCESS,
    users
  }
}

export function getUsersBlogListFailure (error) {
  return {
    type: actionTypes.USERS_BLOG_LOAD_FAILURE,
    error
  }
}

export function getUsersBlogList(requestHost) {
  return {
    type: actionTypes.USERS_BLOG_LOAD,
    requestHost
  }
}

export function getUsersBlogListSuccess(usersBlog) {
  return {
    type: actionTypes.USERS_BLOG_LOAD_SUCCESS,
    usersBlog
  }
}

export function setSession(userSession) {
  return {
    type: actionTypes.SET_SESSION,
    userSession
  }
}

export function removeSessionFailure (error) {
  return {
    type: actionTypes.REMOVE_SESSION_FAILURE,
    error
  }
}

export function removeSession() {
  return {
    type: actionTypes.REMOVE_SESSION,
  }
}

export function removeSessionSuccess() {
  return {
    type: actionTypes.REMOVE_SESSION_SUCCESS,
    userSession: {},
  }
}

