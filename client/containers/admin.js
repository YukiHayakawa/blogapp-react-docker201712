import { connect } from 'react-redux'
import Layout from './layout'
import AdminListItem from '../components/adminListItem'
import Form from '../components/adminForm'
import Error from '../components/error'
import { getUsersBlogList } from '../actions'
import { convertObj } from '../utill/functions'
import config from '../config';

import { Container, Segment, Dimmer, Loader } from 'semantic-ui-react'

const Admin = ({ dispatch, blogReducer, blogId }) => {
  const {userSession, usersBlog, usersBlogLoding} = blogReducer;
  if (userSession.id && usersBlog.length === 0 &&  usersBlogLoding === '') {
    dispatch(getUsersBlogList('localhost'));
  }
  const blogKeys = convertObj(usersBlog, 'id');
  const blogData = userSession && blogId && blogKeys[blogId] ? blogKeys[blogId] : '';
  const page = (
    !userSession.id ?
    'error' :
    usersBlogLoding !== 'end' ?
    'loading' :
    blogId && blogId !== 'add' && blogData.length === '' ?
    'error' :
    blogId && blogId === 'add' ?
    'add' :
    blogId ?
    'edit' :
    'mypage'
  );

  const pageTitle = (
    page === 'error' ?
    'ERROR 404' :
    page === 'loading' ?
    'LOADING' :
    page === 'add' ?
    'BLOG ADD' :
    page === 'edit' ?
    'BLOG EDIT' :
    page === 'mypage' ?
    'MYPAGE' :
    ''
  );

  const bred = (
    page === 'error' ?
    [{
      name: 'ERROR404'
    }] :
    page === 'loading' ?
    [{
      name: 'LOADING'
    }] :
    page === 'add' ?
    [{
      name: 'MYPAGE',
      link: '/admin/'
    },
    {
      name: 'ADD',
    }] :
    page === 'edit' ?
    [{
      name: 'MYPAGE',
      link: '/admin/'
    }, {
      name: blogData.title  
    }] :
    page === 'mypage' ?
    [{
      name: 'MYPAGE'
    }] :
    []
  );

  return (
    <Layout
      bred={bred}
      title={`${config.app.title}`}
      pageTitle={pageTitle}
      isTop={false}
      headTitle={`${pageTitle} | ${config.app.title}`}>
      <Container style={{ marginTop: '4em' }}>
        {page === 'error' ?
          <Error/>
        : page === 'loading' ?
          <div style={{ minHeight: 500 }}>
            <Dimmer active>
              <Loader size='large'>Loading</Loader>
            </Dimmer>
          </div>
        : page === 'add' ?
          <Form pageTitle={pageTitle} blog='add' />
        : page === 'edit' ?
          <Form pageTitle={pageTitle} blog={blogData} />
        :
          <AdminListItem blog={usersBlog} />
        }
      </Container>
    </Layout>
  )
}

export default connect(state => state)(Admin)
