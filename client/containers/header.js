import Link from 'next/link'
import { Container, Menu, Image, Button, Modal, Form } from 'semantic-ui-react'
import AuthForm from '../components/authForm';

export default ({ title }) => {
  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Link prefetch href="/">
            <a>
              <Menu.Item header>
                <Image
                  size='mini'
                  src='https://react.semantic-ui.com/logo.png'
                  style={{ marginRight: '1.5em' }}
                />
                {title}
              </Menu.Item>
            </a>
          </Link>  
          <Link href="/blog/">
            <a>
              <Menu.Item>
                <Button secondary style={{margin: 0}}>BLOG</Button>
              </Menu.Item>  
            </a>
          </Link>  
          <AuthForm />
        </Container>
      </Menu>
    </div>
  );
}
