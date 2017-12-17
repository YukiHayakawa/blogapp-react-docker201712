import { connect } from 'react-redux'

import { Container} from 'semantic-ui-react'


function App({blogReducer}) {
  const { blog, userSession } = blogReducer;
  return (
    <Container style={{ marginTop: '4em' }}>
      <p style={{textAlign: 'center',fontSize:'14rem',marginBottom:0,color:'#ddd'}}>404</p>  
      <p style={{textAlign: 'center'}}>The page could not be found</p>  
    </Container>
  )
}

export default connect(state => state)(App)
