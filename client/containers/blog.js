import { connect } from 'react-redux'
import Layout from './layout'
import ListItem from '../components/listItem'
import Single from '../components/single'
import { convertObj } from '../utill/functions'
import config from '../config';
import { Container, Dimmer, Loader } from 'semantic-ui-react'

const Blog = ({ blogReducer , blogId}) => {

  const { blog, users, userSession, loading } = blogReducer;
  const pageTitle = blogId ? 'BLOG' : 'BLOG LIST';
  const single = blogId ? blog.filter((obj) => {
    if(obj.id === blogId ) return obj;
  }) : [];
  const bred = blogId ? [{
    name: 'BLOGLIST',
    link: '/blog/'
  }, {
    name: single[0].title
  }] : [{
    name: 'BLOGLIST'
  }];
  return (
    <Layout bred={bred} title={`${config.app.title}`} pageTitle={pageTitle} isTop={false} headTitle={`${pageTitle} | ${config.app.title}`}>
      <Container style={{ minHeight: 400, marginTop: '4em' }}>
        {loading ? 
          <Dimmer active>
            <Loader size='large'>Loading</Loader>
          </Dimmer>  
        : blogId ?
          <Single blog={single[0]} />
        :
          <ListItem blog={blog} users={convertObj(users, 'id')} title={pageTitle} />
        }  
      </Container>
    </Layout>
  )
}

export default connect(state => state)(Blog)
