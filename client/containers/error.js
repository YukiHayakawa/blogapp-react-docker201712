import { connect } from 'react-redux'
import Layout from './layout'
import Error from '../components/error'
import config from '../config';
import { Container } from 'semantic-ui-react'

function App() {
  return (
    <Layout title={`${config.app.title}`} pageTitle='ERROR 404' isTop={false} headTitle={`${config.app.title}`}>
      <Container style={{ marginTop: '4em' }}>
        <Error />
      </Container>
    </Layout>
  )
}

export default connect(state => state)(App)
