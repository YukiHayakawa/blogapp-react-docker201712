import Link from 'next/link'
import moment from 'moment';
import { stripTags, truncate } from '../utill/functions';
import { Card, Image, Header, Divider, Grid, Label } from 'semantic-ui-react';
import config from '../config';

export default ({ blog, title, users }) => (
  <div>
    <Header as='h1'>{title}</Header>  
    <Divider />
    <Card.Group itemsPerRow={4} stackable={true}>
      {blog.map(data => (
        <Card key={data.id} style={{overflow: 'hidden'}}>
          <Link href={`/blog/`} as={`/blog/${data.id}/`}>
            <a>
              <Image src={!data.thumb || data.thumb === '' ? '/static/noImage.png' : `${config.app.imageServerHost}/static/${data.users}/${data.thumb}`} />
            </a>
          </Link>
          <Card.Content>
            <Card.Header>
              {data.title}
            </Card.Header>
            <Card.Meta>
              <Grid columns={2}>
                <Grid.Column style={{marginRight:0}}>
                  {moment(data.modified).format('YYYY.MM.DD')}
                </Grid.Column>
                <Grid.Column style={{paddingRight:0, textAlign: 'right'}}>
                  @ {users[data.users].name}
                </Grid.Column>
              </Grid>
            </Card.Meta>
            <Card.Description>
              {truncate(stripTags(data.body), 40)}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link href={`/blog/`} as={`/blog/${data.id}/`}>
              <a>More...</a>
            </Link>
          </Card.Content>
          {moment(data.modified).add(1, 'days').diff(moment(), 'days', true) > -1 && 
            <Label color='teal' corner='left' style={{padding: 4,textIndent: '-12px'}}>New</Label>
          }
        </Card>
      ))}
    </Card.Group>
  </div>
)
