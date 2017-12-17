import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import config from '../config';
import { changeFormData, changeFlg, getHoge } from '../actions/authForm';
import { removeSession } from '../actions';
import { Menu, Button, Modal, Form, Grid, Message, Image, Dropdown, Dimmer, Loader } from 'semantic-ui-react'

const AuthForm = ({ dispatch, authFormReducer, blogReducer }) => {
  const { flg, login, regist, validationMsg } = authFormReducer;
  const { userSession } = blogReducer;
  // console.log(authFormReducer, blogReducer)
  // console.log()
  const show = form => () => {
    dispatch(changeFlg({
      modal: true,
      formError: false,
      formActive: form,
    }))
    handleDisabled(form);
  }
  const close = () => { 
    dispatch(changeFlg({modal: false}))
  };
  const onLogoutClick = () => {
    if (location.href.match(/admin/)) {
      Router.push(`/`);
    }
    dispatch(removeSession())
  }
  const onFormChange = (e, props) => {

    const valids = props['data-valid'].split(',');
    const promise = new Promise((resolve) => {
      let fetchFlg = false;
      for (let valid of valids) {
        if (valid === 'req' && props.value === '') {
          resolve(validationMsg[valid]);
          break;
        } else if (valid === 'email' && !props.value.match(/^[A-Za-z0-9]+[\w-]+@[\w\.-]+\.\w{2,}$/)){
          resolve(validationMsg[valid]);
          break;
        } else if (valid === 'emailUniq') {
          fetchFlg = true;
          fetch(`${config.app.apiServerHost}/api/users?email=${props.value}`)
          .then((response) =>  {
            return response.json();
          })
          .then((json) => {
            if (json.result === 'success' && json.length === 0) {
              resolve('');
            }
            resolve(validationMsg[valid]);
          });
        }
      }
      if (fetchFlg === false) {
        resolve('');
      } 
    });

    promise.then((msg) => {
      dispatch(changeFormData(props.name, props.value, msg))
      handleDisabled(flg.formActive);
    });
  }

  const handleDisabled = (formFlg) => {
    let isError = false
    for (let err of Object.keys(authFormReducer[flg.formActive]['errorMsg'])) { 
      if (authFormReducer[flg.formActive]['formData'][err] === '' || authFormReducer[flg.formActive]['errorMsg'][err] !== '') {
        isError = true;
        break;
      }
    }

    dispatch(changeFlg({
      btnDisabled: isError,
    }))
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(changeFlg({loading: true}))
    const obj = authFormReducer[flg.formActive]['formData'];
    const method = 'POST';
    const credentials = 'same-origin';
    const body = JSON.stringify(obj);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(`/api/${flg.formActive}/`,{method, credentials, headers, body})
    .then((response) =>  {
      return response.json();
    })
    .then((json) => {

      if (flg.formActive === 'regist') {
        if (json.result === 'success') {
          dispatch(changeFlg({loading: false, registEndFlg: true,formActive: 'login'}))
        } else {
          dispatch(changeFlg({loading: false, formError: true}))
        }
      } else {
        if (json.result === 'success') {
          location.reload();
        } else {
          dispatch(changeFlg({loading: false, formError: true}))
        }
      }
    });
  }


  return (
    <Menu.Menu position='right'>
      {userSession && userSession.name ?
        <Dropdown trigger={(<span><Image style={{paddingRight: 8}} verticalAlign='middle' size='mini' src='/static/user.jpg' />{userSession.name}</span>)} item simple>
          <Dropdown.Menu>
            <Link prefetch href={`/admin/`} as={`/admin/`}>
              <a>
                <Dropdown.Item style={{color:'rgba(0,0,0,.87)'}}>
                  My Page
                </Dropdown.Item>
              </a>
            </Link>
            <Link prefetch href={`/admin/`} as={`/admin/add/`}>
              <a>
                <Dropdown.Item style={{color:'rgba(0,0,0,.87)'}}>
                  Blog Add
                </Dropdown.Item>
              </a>
            </Link>
            <Dropdown.Divider />
            <a onClick={onLogoutClick}>
              <Dropdown.Item style={{ color: 'rgba(0,0,0,.87)' }}>
                Sign out
              </Dropdown.Item>
            </a>
          </Dropdown.Menu>
        </Dropdown>
      :
        <Menu.Menu position='right'>
          <Menu.Item className='item'>
            <Button onClick={show('login')} secondary>Sign in</Button>  
          </Menu.Item>
          <Menu.Item className='item'>
            <Button onClick={show('regist')} secondary>Sign up</Button>
          </Menu.Item>
          <Modal size='tiny' form={flg.formActive} open={flg.modal} onClose={close} closeIcon>
            {flg.loading &&
              <Dimmer active inverted>
                <Loader size='large'>Loading</Loader>
              </Dimmer>  
            }
            <Modal.Header  icon='archive'>
              {flg.formActive === 'regist' ? 'Create your account' : 'Login with your account'} 
            </Modal.Header>
            <Modal.Content>
              <Form>
                {flg.formActive === 'regist' ?
                  flg.registEnd ? 
                    <div>
                      <Message positive>
                        <Message.Header>Your user registration was successful</Message.Header>
                      </Message>
                      <p>Please click the sign in button below and login</p>
                      <Grid centered columns={2} style={{marginTop:8}}>
                        <Grid.Column textAlign='center'>
                          <Button onClick={show('login')} size='medium' fluid primary>Sign in</Button>   
                        </Grid.Column>
                      </Grid>
                    </div>
                  :
                    <div>
                      {flg.formError ? 
                        <p style={{color: '#e20026'}}>An error occurred. Please check the input content</p>
                      :
                        <p>Please enter the following items and click send</p>
                      }
                      <Form.Field style={{position: 'relative', paddingBottom: 8,marginBottom: 0}}>
                        <label>Name</label>
                        <Form.Input placeholder='Choose your Name' onChange={onFormChange} value={regist.formData.name} type="text" data-valid="req" data-name="name" name="name" />
                        <p style={{position: 'absolute',left: 0, bottom:4, fontSize:11, color: '#e20026'}}>{regist.errorMsg.name}</p>
                      </Form.Field>
                      <Form.Field style={{position: 'relative', paddingBottom: 8,marginBottom: 0}}>
                        <label>Email</label>
                        <Form.Input placeholder='Email address' onChange={onFormChange} value={regist.formData.email} type="text" data-valid="req,email,emailUniq" data-name="email" name="email" />
                        <p style={{position: 'absolute',left: 0, bottom:4, fontSize:11, color: '#e20026'}}>{regist.errorMsg.email}</p>
                      </Form.Field>
                      <Form.Field style={{position: 'relative', paddingBottom: 8,marginBottom: 0}}>
                        <label>Password</label>
                        <Form.Input placeholder='Coose a password' onChange={onFormChange} value={regist.formData.pass} type="password" data-valid="req" data-name="pass" name="pass" />
                        <p style={{position: 'absolute',left: 0, bottom:4, fontSize:11, color: '#e20026'}}>{regist.errorMsg.pass}</p>
                      </Form.Field>
                      <Grid centered columns={2} style={{marginTop:8}}>
                        <Grid.Column textAlign='center'>
                          <Button fluid disabled={flg.btnDisabled} onClick={onFormSubmit} size='medium' type='submit' primary>{flg.formActive === 'regist' ? 'Sign up' : 'Sign in'} </Button>  
                        </Grid.Column>
                      </Grid>
                    </div>
                  :
                  <div>
                    {flg.formError ? 
                      <p style={{color: '#e20026'}}>An error occurred. Please check the input content</p>
                    :
                      <p>Please enter the following items and click send</p>
                    }
                    <Form.Field style={{ position: 'relative', paddingBottom: 8, marginBottom: 0 }}>
                      <label>Email</label>
                      <Form.Input placeholder='Email address' onChange={onFormChange} value={login.formData.email} type="text" data-valid="req,email" data-name="email" name="email" />
                      <p style={{position: 'absolute',left: 0, bottom:4, fontSize:11, color: '#e20026'}}>{login.errorMsg.email}</p>
                    </Form.Field>
                    <Form.Field style={{position: 'relative', paddingBottom: 8,marginBottom: 0}}>
                      <label>Password</label>
                      <Form.Input placeholder='Password' onChange={onFormChange} value={login.formData.pass} type="password" data-valid="req" data-name="pass" name="pass" />
                      <p style={{position: 'absolute',left: 0, bottom:4, fontSize:11, color: '#e20026'}}>{login.errorMsg.pass}</p>
                    </Form.Field>
                    <Grid centered columns={2} style={{marginTop:8}}>
                      <Grid.Column textAlign='center'>
                        <Button fluid disabled={flg.btnDisabled} onClick={onFormSubmit} size='medium' type='submit' primary>{flg.formActive === 'regist' ? 'Sign up' : 'Sign in'} </Button>  
                      </Grid.Column>
                    </Grid>
                  </div>
                } 
              </Form>
            </Modal.Content>
          </Modal>
        </Menu.Menu>
      }
    </Menu.Menu>
  );
}
export default connect(state => state)(AuthForm)  
