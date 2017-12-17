import { connect } from 'react-redux'
import Link from 'next/link'
import moment from 'moment';
import { stripTags, stripTagsBr, truncate, convertObj } from '../utill/functions'
import { Divider, Image, Segment, List, Header, Grid, Label } from 'semantic-ui-react'
import config from '../config';


const Single = ({ blog , blogReducer}) => {
  const users = convertObj(blogReducer.users, 'id');
  const blogList = blogReducer.blog.filter((list) => {
    if (list.id !== blog.id) return list;
  })
  return (
    <div>
      <Grid stackable={true}>
        <Grid.Row>
          <Grid.Column width={12}>
            <Segment style={{paddingBottom:80}}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <div style={{position: 'relative'}}>  
                      <Image src={!blog.thumb || blog.thumb === '' ? '/static/noImage.png' : `${config.app.imageServerHost}/static/${blog.users}/${blog.thumb}`}fluid />
                      {moment(blog.modified).add(1, 'days').diff(moment(), 'days', true) > -1 && 
                        <Label color='teal' corner='left' style={{padding: 4,textIndent: '-12px'}}>New</Label>
                      }
                    </div>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Header as='h1'>{blog.title}</Header> 
                    <p style={{color: 'rgba(0,0,0,.4)'}}>{moment(blog.modified).format('YYYY年MM月DD日')}に更新<br />@ {users[blog.users].name}</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider />
              <div dangerouslySetInnerHTML={{__html: stripTagsBr(blog.body)}} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <Header as='h3'>BLOG LIST</Header>
                <List divided verticalAlign='middle'>
                {blogList.map(data => (
                  <List.Item key={data.id}>
                    <Link prefetch href={`/blog/`} as={`/blog/${data.id}/`}>
                      <a>
                        <Grid>
                          <Grid.Row style={{padding: '20px 0'}}>
                            <Grid.Column width={4} style={{paddingRight: 0}}>
                              <Image src={!data.thumb || data.thumb === '' ? '/static/noImage.png' : `${config.app.imageServerHost}/static/${data.users}/${data.thumb}`} fluid />
                            </Grid.Column>
                            <Grid.Column width={12}>
                              <Header as='h1' style={{fontSize: '14px'}}>{data.title}</Header> 
                              <p>{moment(data.modified).format('YYYY年MM月DD日')}に更新<br />{truncate(stripTags(data.body), 10)}</p>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </a>  
                    </Link>  
                  </List.Item>
                ))}
                </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default connect(state => state)(Single)
