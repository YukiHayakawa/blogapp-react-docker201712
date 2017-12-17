import { combineReducers } from 'redux';
import { actionTypes } from '../actions'
import config from '../config';

const initialState = {

  imageViewer: {
    isUploading: false,
    dropzoneActive: false,
    isSelect: false,
    isImageloading: false,
    images: [],
  },
  flg: {
    modal: false,
    isUpdate: '',
  },
  formEditData: {
    title: '',
    body: '',
    thumb: '',
    state: 'public'
  }
}

const blogFormReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.CHANGE_IMAGEVIEWER:
    return {
      ...state,
      ...{
        imageViewer: Object.assign(state.flg, action.obj)
      }
    }  

    case actionTypes.CHANGE_FORM_EDITDATA:
    return {
      ...state,
      ...{
        formEditData: Object.assign(state.formEditData, {
          [action.key]: action.value
        })
      }
    }  

    case actionTypes.CHANGE_FORM_INITDATA:
    return {
      ...state,
      ...{
        formEditData: action.obj
      }
    }  

    case actionTypes.CHANGE_BLOG_FLG:
    return {
      ...state,
      ...{
        flg: Object.assign(state.flg, action.obj)
      }
    }  

    default:
      return state
  }
}

export default blogFormReducer;
