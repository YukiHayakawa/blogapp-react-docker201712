import Link from 'next/link'
import { Container, Divider, Grid, Header, Image, List, Segment } from 'semantic-ui-react'

export default ({title}) => {
  return (
    <div>
      <Segment
        inverted
        vertical
        style={{ margin: '5em 0em 0em', padding: '2em 0em' }}
      >
        <Container textAlign='center'>
          <Image
            centered
            size='mini'
            src='https://react.semantic-ui.com/logo.png'
          />
          <List style={{ paddingTop: '24px'}} horizontal inverted divided link>
            <List.Item>
              <Link prefetch href="/"><a>HOME</a></Link>
            </List.Item>
            <List.Item>
              <Link prefetch href="/blog/"><a>BLOG</a></Link>
            </List.Item>
          </List>
          <p>&copy; {title}</p>
        </Container>
      </Segment>
    </div>
  );
}
