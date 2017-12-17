import { combineReducers } from 'redux';
import { actionTypes } from '../actions'
import config from '../config';

const initialState = {
  login: {
    formData: { email: '', pass: '' },
    errorMsg: { email: '', pass: '' },
  },
  regist: {
    formData: { email: '', pass: '', name: '' },
    errorMsg: { email: '', pass: '', name: '' },
  },
  flg: {
    modal: false,
    registEnd: false,
    btnDisabled: true,
    formError: false,
    formActive: 'login',
    loading: false,
  },
  validationMsg: config.authForm.validationMsg,
  hoge: [],
  loading: false,
  requestHost: 'server'
}

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOGE: 
    return {
      ...state,
      ...{
        loading: true,
        requestHost: action.requestHost
      }
    }
    
    case actionTypes.GET_HOGE_SUCCESS: 
    return {
      ...state,
      ...{
        hoge: action.hoge,
        loading: false
      }
    }


    case actionTypes.CHANGE_FORMDATA:
    return {
      ...state,
      ...{
        [state.flg.formActive]: Object.assign(
          state[state.flg.formActive],
          {
            formData: Object.assign(
              state[state.flg.formActive]['formData'],
              {
                [action.key]: action.value 
              }
            )
          }
        ),
        [state.flg.formActive]: Object.assign(
          state[state.flg.formActive],
          {
            errorMsg: Object.assign(
              state[state.flg.formActive]['errorMsg'],
              {
                [action.key]: action.errorMsg 
              }
            )
          }
        )
      }
    }

    case actionTypes.CHANGE_AUTH_FLG:
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

export default formReducer;
