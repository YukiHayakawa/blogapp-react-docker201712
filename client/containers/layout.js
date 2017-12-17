import Head from './head'
import PageHeader from './header'
import Footer from './footer'
import Link from 'next/link'
import { Container, Image, Header, Breadcrumb, Icon } from 'semantic-ui-react'

export default ({ children,  headTitle, title, pageTitle, isTop, bred }) => (
  <div style={{background:'#efefef'}}>
    <Head headTitle={headTitle} />
    <PageHeader title={title} />
    <div style={{ height: isTop ? 400 : 220, background: '#1b1c1d', textAlign: 'center', padding: 40, position: 'relative', overflow: 'hidden', borderBottom: '2px solid #1b1c1d' }}>
      <Container style={{ marginTop: isTop ? '9.4em': '5.4em', color: '#fff', position: 'relative', zIndex: 1, paddingBottom: 60 }}>
        <Header style={{ color: '#fff' }} as='h1'>{pageTitle}</Header>
        {isTop &&
          <div>
            <p>This site is an appropriately made blog service.</p>
            <p>Easy membership registration, login and updating blog data are possible.</p>
          </div>
        }
        {bred && 
        <Breadcrumb style={{ position: 'absolute', left: 0, bottom: 16 }}>
          <Breadcrumb.Section>
            <Link prefetch href={`/`}>
              <a style={{color:'#fff'}}>
                <Icon name='home' />
              </a>
            </Link>
          </Breadcrumb.Section>
          {bred.map((list,i) => {
            return (
              <span key={i}>
                <Breadcrumb.Divider style={{ color: '#fff' }} icon='right angle' />
                <Breadcrumb.Section>
                  {list.link ?
                    <Link prefetch href={list.link}>
                      <a style={{color:'#fff'}}>
                        {list.name}
                      </a>
                    </Link>
                  :
                    <span>{list.name}</span>
                  }
                </Breadcrumb.Section>
              </span>  
            )
          })}
        </Breadcrumb>
        }

      </Container>
      <Image src='/static/main.jpg' fluid style={{ position: 'absolute', top: 0, left: 0 }}/>
    </div>
    {children}
    <Footer title={title} />
  </div>
)
