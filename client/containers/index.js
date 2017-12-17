import { connect } from 'react-redux'
import Layout from './layout'
import ListItem from '../components/listItem'
import config from '../config';
import { convertObj } from '../utill/functions'
import { Container, Dimmer, Loader} from 'semantic-ui-react'

const App = ({ blogReducer }) => {
  const { blog, users, userSession, loading } = blogReducer;
  // console.log(blogReducer)
  return (
    <Layout title={`${config.app.title}`} pageTitle={`${config.app.title}`} isTop={true}  headTitle={`${config.app.title}`}>
      <Container style={{ minHeight: 400, marginTop: '4em' }}>
        {loading ? 
          <Dimmer active>
            <Loader size='large'>Loading</Loader>
          </Dimmer>  
        :
          <ListItem blog={blog.slice(0, 4)} users={convertObj(users, 'id')} title='NEW BLOG' />
        }
      </Container>
    </Layout>
  )
}

export default connect(state => state)(App)
