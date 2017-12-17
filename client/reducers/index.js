import { combineReducers } from 'redux';
import { actionTypes } from '../actions'
import authFormReducer from './authForm'
import blogFormReducer from './blogForm'

const initialState = {
  loading: false,
  usersBlogLoding: '',
  requestHost: 'server',
  error: false,
  blog: [],
  users: [],
  usersBlog: [],
  title: 'BLOG APP',
  userSession: {},
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.BLOG_LOAD_FAILURE:
      return {
        ...state,
        ...{error: action.error}
      }

    case actionTypes.BLOG_LOAD_SUCCESS:
      return {
        ...state,
        ...{
          blog: action.blog,
          loading: false
        }
      }

    case actionTypes.BLOG_LOAD:
      return {
        ...state,
        ...{
          loading: true,
          requestHost: action.requestHost
        }
      }

    case actionTypes.USERS_LOAD_FAILURE:
    return {
      ...state,
      ...{error: action.error}
    }

    case actionTypes.USERS_LOAD_SUCCESS:
      return {
        ...state,
        ...{
          users: action.users,
          loading: false
        }
      }

    case actionTypes.USERS_LOAD:
      return {
        ...state,
        ...{
          requestHost: action.requestHost
        }
      }

    case actionTypes.USERS_BLOG_LOAD_FAILURE:
      return {
        ...state,
        ...{error: action.error}
      }

    case actionTypes.USERS_BLOG_LOAD_SUCCESS:
      return {
        ...state,
        ...{
          usersBlog: action.usersBlog,
          usersBlogLoding: 'end'
        }
      }

    case actionTypes.USERS_BLOG_LOAD:
      return {
        ...state,
        ...{
          userId: state.userSession.id,
          requestHost: action.requestHost,
          usersBlogLoding: 'start'
        }
      }

    case actionTypes.SET_SESSION:
    return {
      ...state,
      ...{
        userSession: action.userSession
      }
    }

    case actionTypes.REMOVE_SESSION_FAILURE:
    return {
      ...state,
      ...{
        error: action.error,
        loading: false,
      }
    }
      
    case actionTypes.REMOVE_SESSION:
    return {
      ...state,
      ...{
        loading: true,
      }
    }

    case actionTypes.REMOVE_SESSION_SUCCESS:
    return {
      ...state,
      ...{
        loading: false,
        userSession: action.userSession,
        userId: false
      }
    }

    default:
      return state
  }
}

const rootReducer = combineReducers({
  blogReducer,
  authFormReducer,
  blogFormReducer
});

export default rootReducer
