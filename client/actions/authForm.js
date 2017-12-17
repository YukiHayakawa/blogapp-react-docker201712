import { actionTypes } from './'

export function getHoge(requestHost) {
  return {
    type: actionTypes.GET_HOGE,
    requestHost
  }
}

export function getHogeSuccess(hoge) {
  return {
    type: actionTypes.GET_HOGE_SUCCESS,
    hoge
  }
}


export function changeFlg(obj) {
  return {
    type: actionTypes.CHANGE_AUTH_FLG,
    obj
  }
}
export function changeFormData(key,value,errorMsg) {
  return {
    type: actionTypes.CHANGE_FORMDATA,
    key,
    value,
    errorMsg
  }
}

