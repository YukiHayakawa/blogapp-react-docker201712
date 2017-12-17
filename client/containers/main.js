import { Container, Image, Header } from 'semantic-ui-react'
export default ({ title }) => (
  <div style={{ height: 200, background: '#1b1c1d', textAlign: 'center', padding: 40, position: 'relative', overflow: 'hidden', borderBottom: '2px solid #1b1c1d' }}>
    <Container style={{ marginTop: '5.4em', color: '#fff', position: 'relative', zIndex: 1 }}>
      <Header style={{ color: '#fff' }} as='h1'>{ title }</Header>
    </Container>
    <Image src='/static/main.jpg' fluid style={{ position: 'absolute', top: 0, left: 0 }}/>
  </div>
)
