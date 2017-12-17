/* global fetch */

import { delay } from 'redux-saga'
import { all, put, select, takeLatest } from 'redux-saga/effects'
import 'isomorphic-fetch'
import config from '../config'

import { actionTypes, getBlogListFailure, getBlogListSuccess, getUsersListFailure, getUsersListSuccess, getUsersBlogListFailure, getUsersBlogListSuccess, removeSessionSuccess, removeSessionFailure } from '../actions'

function* getBlogListSaga(action) {
  try {
    const store = yield select();
    const res = yield fetch(`http://${store.blogReducer.requestHost}:8080/api/blog?_fields=id,title,body,thumb,users,state,created,modified&state=public&_order[modified]=DESC`)
    const data = yield res.json()
    yield put(getBlogListSuccess(data.json))
  } catch (err) {
    yield put(getBlogListFailure(err))
  }
}

function* getUsersListSaga(action) {
  try {
    const store = yield select();
    const res = yield fetch(`http://${store.blogReducer.requestHost}:8080/api/users?_fields=id,name,thumb,profile,created,modified&state=public&_order[modified]=DESC`)
    const data = yield res.json()
    yield put(getUsersListSuccess(data.json))
  } catch (err) {
    yield put(getUsersListFailure(err))
  }
}


function* getUsersBlogListSaga(action) {
  try {
    const store = yield select();
    const res = yield fetch(`http://${store.blogReducer.requestHost}:8080/api/blog?_fields=id,title,body,thumb,users,state,created,modified&users=${store.blogReducer.userId}&_order[modified]=DESC`)
    const data = yield res.json()
    yield put(getUsersBlogListSuccess(data.json))
  } catch (err) {
    yield put(getUsersBlogListFailure(err))
  }
}

function* removeSessionSaga(action) {
  try {
    const method = 'POST';
    const credentials = 'same-origin';
    const body = {};
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const store = yield select();
    const res = yield fetch(`${config.app.siteUrl}/api/logout/`,{method, credentials, headers, body})
    const data = yield res.json()
    if (data.result === 'success') {
      yield put(removeSessionSuccess(data))
    } else {
      yield put(removeSessionFailure('error'))
    }
  } catch (err) {
  }
}

function * rootSaga() {
  yield all([
    takeLatest(actionTypes.USERS_LOAD, getUsersListSaga),
    takeLatest(actionTypes.BLOG_LOAD, getBlogListSaga),
    takeLatest(actionTypes.USERS_BLOG_LOAD, getUsersBlogListSaga),
    takeLatest(actionTypes.REMOVE_SESSION, removeSessionSaga),
  ])
}

export default rootSaga
