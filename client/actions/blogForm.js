import { actionTypes } from './'

export function changeFlg(obj) {
  return {
    type: actionTypes.CHANGE_BLOG_FLG,
    obj
  }
}
export function changeFormInitData(obj) {
  return {
    type: actionTypes.CHANGE_FORM_INITDATA,
    obj,
  }
}
export function changeFormEditData(key, value) {
  return {
    type: actionTypes.CHANGE_FORM_EDITDATA,
    key,
    value,
  }
}
export function changeImageViewer(obj) {
  return {
    type: actionTypes.CHANGE_IMAGEVIEWER,
    obj
  }
}

