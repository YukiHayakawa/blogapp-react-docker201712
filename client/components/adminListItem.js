import Link from 'next/link'
import moment from 'moment';
import { stripTags, truncate } from '../utill/functions';
import { Segment, Item, Image, Header, Divider, Label, Grid, Button } from 'semantic-ui-react';
import config from '../config';

export default ({ blog }) => (
  <div>
    <Header as='h1'>BLOG LIST</Header>
    <Divider />
    {blog.length > 0 ?
      <Segment>
        <Item.Group divided>
          {blog.map(data => (
            <Item key={data.id} style={{position:'relative'}} >
              <Item.Image size='small' src={!data.thumb || data.thumb === '' ? '/static/noImage.png' : `${config.app.imageServerHost}/static/${data.users}/${data.thumb}`} />
              <Item.Content>
                <Item.Header>
                <Link prefetch href={`/admin/`} as={`/admin/${data.id}/`}>
                  <a>  
                    {data.title}
                  </a>
                </Link>
                </Item.Header>
                <Item.Description>
                  <Link prefetch href={`/admin/`} as={`/admin/${data.id}/`}>
                    <a>  
                      <span className='date'>
                        {moment(data.modified).format('YYYY.MM.DD')}
                      </span>
                      <p>
                        {truncate(stripTags(data.body), 40)}
                      </p>
                    </a>
                  </Link>
                </Item.Description>
                {moment(data.modified).add(1, 'days').diff(moment(), 'days', true) > -1 && 
                <Label color='teal' corner='left' style={{ padding: 4, textIndent: '-12px'}}>New</Label>
              }
              </Item.Content>
              <Label attached='bottom right'>{config.blogForm.state[data.state]}</Label>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    :
      <div style={{textAlign: 'center'}}>
        <p>Let's create a blog immediately</p>  
        <Grid centered columns={2}>
          <Grid.Column>
            <Link prefetch href={`/admin/`} as={`/admin/add/`}>
              <a>
                <Button fluid size='medium' primary>Blog Add</Button> 
              </a>
            </Link>
          </Grid.Column>
        </Grid>
      </div>
    }  
  </div>  
)
