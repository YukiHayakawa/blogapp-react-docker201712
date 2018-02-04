import { connect } from 'react-redux'
import Dropzone from 'react-dropzone';
import Router from 'next/router';
import axios from 'axios';
import { stripTags } from '../utill/functions'
import config from '../config';
import Link from 'next/link'
import moment from 'moment';
import { changeImageViewer, changeFlg, changeFormEditData, changeFormInitData } from '../actions/blogForm'
import { getBlogList, getUsersBlogList } from '../actions'
import { Divider, Form, TextArea, Label, Image, Segment, Button, Header, Modal, Grid, Dimmer, Loader, Message, Dropdown } from 'semantic-ui-react'
import { setTimeout } from 'timers';

const BlogForm = ({ dispatch, blogFormReducer, blogReducer, pageTitle, blog }) => {
  const { flg, imageViewer, formEditData } = blogFormReducer;
  // console.log(blogReducer,blogFormReducer, formEditData,formEditData.id , blog.id)
  if (blog !== 'add' && (!formEditData.id || formEditData.id !== blog.id)) {
    dispatch(changeFlg({ isUpdate: '' }));
    dispatch(changeFormInitData(blog));
  }

  const onFormChange = (e, props) => {
    dispatch(changeFormEditData(props['data-name'],props.value));
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(changeFlg({ isUpdate: 'loading' }));
    const formData = new FormData(e.target.parentNode)
    const url = blog === 'add' ? '/api/blog/' : `/api/blog/${formEditData.id}/`;
    const method = blog === 'add' ? 'post' : 'put';
    formData.append('users',blogReducer.userId);
    formData.append('modified', moment().format('YYYY-MM-DD hh:mm:ss'));
    if (blog === 'add') formData.append('created', moment().format('YYYY-MM-DD hh:mm:ss'));
    fetch(`${config.app.apiServerHost + url}`,{
      method: method,
      body: formData
    })
    .then((response) =>  {
      return response.json();
    })
    .then((json) => {
      if (json.result === 'success') {
        dispatch(getBlogList('localhost'))
        if (blog === 'add') {
          dispatch(getUsersBlogList('localhost'))
          dispatch(changeFormInitData({
            title: '',
            body: '',
            thumb: '',
            state: 'public'
          }));
          Router.push(`/admin/`);
        } else {
          dispatch(changeFlg({ isUpdate: 'success' }));
        }
      } else {
        dispatch(changeFlg({ isUpdate: 'error' }));
      }

    });
  }

  const onModalOpen = () => {
    dispatch(changeFlg({modal: true}));
    if (imageViewer.isImageloading === false) {
      fetch(`${config.app.imageServerHost}/getImage/${blogReducer.userId}`)
      .then((response) =>  {
        return response.json();
      })
      .then((json) => {
        const isSelect = json.images ? (() => {
          for (let i = 0, l = json.images.length; i < l; i++) {
            if (json.images[i].name === formEditData.thumb) return i;
          }
          return false;
        })() : false;
        dispatch(changeImageViewer({
          isImageloading: true,
          images: json.images,
          isSelect: isSelect
        }));
      })
    }
  }
  const onModalClose = () => {
    dispatch(changeFlg({modal: false}));
  }

  const onInsertImage = () => {
    dispatch(changeFlg({ modal: false }));
    dispatch(changeFormEditData('thumb',imageViewer.images[imageViewer.isSelect].name));
  }

  const onSelectImage = (e, count) => {
    e.preventDefault();
    const isSelect = count === imageViewer.isSelect ? false : count;
    dispatch(changeImageViewer({isSelect: isSelect}));
  }
  const onDragEnter = () => {
    dispatch(changeImageViewer({ dropzoneActive: true }));
  }

  const onDragLeave = () => {
    dispatch(changeImageViewer({dropzoneActive: false}));
  }

  const onDrop = (files) => {
    dispatch(changeImageViewer({
      isUploading: true,
      dropzoneActive: false
    }));

    Promise.all(files.map(file => uploadImage(file)))
    .then(images => {
      console.log(imageViewer, images)
      dispatch(changeImageViewer({
        images: imageViewer.images ? imageViewer.images.concat(images) : images,
        isUploading: false,
      }));
    }).catch(e => console.log(e));
  }

  const uploadImage = (file) => {
    return axios.get('./', {
      params: {
        filename: file.name,
        filetype: file.type
      }
    }).then(res => {
      const options = {
        headers: {
          'Content-Type': file.type
        }
      };
      return axios.put(`${config.app.imageServerHost}/upload/${blogReducer.userId}/${file.name}`, file, options);
    }).then(res => {
      const name = res.data;
      return {
        name,
        url: `${config.app.imageServerHost}/static/${blogReducer.userId}/${name}`
      };
    });
  }

  const image = !formEditData.thumb || formEditData.thumb === '' ? '/static/noImage.png' : `${config.app.imageServerHost}/static/${blogReducer.userId}/${formEditData.thumb}`;
  const options = ['public', 'save', 'delete'].map((key) => {
    return {key: key, value: key, text: config.blogForm.state[key]}
  })

  return (
    <div>
      <Header as='h1'>{pageTitle}</Header>
      <Divider />
      {flg.isUpdate === 'success' ? 
        <Message
        positive
          header='SUCCESS!'
          content='Has been updated.'
        />  : flg.isUpdate === 'error' ?  <Message
          error
          header='ERROR!'
          content='Updating could not be done.'
        /> : flg.isUpdate === 'loading' && 
        <Dimmer active>
          <Loader size='large'>Loading</Loader>
        </Dimmer>  
      }
      <Form>  
        <Grid stackable={true}>
          <Grid.Row>
            <Grid.Column width={12}>
            <Header as='h3'>Title</Header>
              <Form.Input placeholder='Title' type='text' name='title' data-name='title' onChange={onFormChange} value={formEditData.title} />
              <Header as='h3'>Body</Header>
              <TextArea placeholder='Body' onChange={onFormChange} name='body' data-name='body' value={stripTags(formEditData.body)} style={{ minHeight: 500 }} />
              {formEditData.id &&
                <input type='hidden' id={formEditData.id} value={formEditData.id} />
              }
            </Grid.Column>
            <Grid.Column width={4}>
            <Header as='h3'>Image</Header>
              <Segment>
                <Image src={image} size='medium' bordered />
                <input type='hidden' name='thumb' value={formEditData.thumb ? formEditData.thumb : ''} />
                <Divider hidden style={{ margin: '.5rem 0' }} />
                <Modal onOpen={onModalOpen} open={flg.modal} onClose={onModalClose} trigger={<Button secondary>Select Image</Button>} closeIcon>
                  <Dropzone
                    disableClick={true}
                    onDrop ={onDrop}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    accept="image/*"
                    style={{ width: 'auto', height: 'auto' }}>
                    <div style={{padding: '1rem'}}>
                      <Header as='h2'>Select Image</Header>
                      <Divider />
                      <div style={{minHeight: 400, position: 'relative', overflowY: 'auto', overflowX: 'hidden', padding: '2px'}}>
                        {imageViewer.images && imageViewer.images.length > 0 &&
                          <Grid doubling columns={6}>
                            {imageViewer.images.map(({name}, key) => (
                            <Grid.Column style={key === imageViewer.isSelect ? { border: 'solid 4px #37bdb3', padding: 0, margin:'12px 0 0 12px' } : {border: 'solid 1px #ddd',padding: 0, margin:'12px 0 0 12px'} } key={key}>
                              <a href={`#${name}`} style={{display: 'table-cell', height: 120, verticalAlign:'top',background: '#333'}} onClick={(e) => onSelectImage(e, key)}>
                                <Image src={`${config.app.imageServerHost}/static/${blogReducer.userId}/${name}`} />
                              </a>
                              <div style={{ position: 'absolute', left: 0, right: 0,bottom: 0, padding: 8, background: 'rgba(0,0,0,.7)',color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{name}</div>  
                            </Grid.Column>
                            ))}
                          </Grid>
                        }
                      </div>
                      {imageViewer.isUploading &&
                        <Dimmer active inverted><Loader inverted>Loading</Loader></Dimmer>}
                        <Divider />
                        <Grid>
                          <Grid.Column width={16} textAlign={`right`}>
                            <p>ファイルをドロップしてアップロード</p>
                            {imageViewer.isSelect === false ? <Button size='large' disabled>Insert Image</Button> : <Button size='large' onClick={onInsertImage} primary>Insert Image</Button>}  
                          </Grid.Column>
                        </Grid>
                      </div>

                      {imageViewer.dropzoneActive && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(36,127,121,.8)', color: '#fff', fontSize: '2.2rem', paddingTop: 260, fontWeight: 'bold', textAlign: 'center' }}>ファイルをドロップしてアップロード</div>}
                  </Dropzone>
                </Modal>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />
        <Dropdown
          onChange={onFormChange}
          options={options}
          placeholder='Select State'
          selection
          data-name='state'
          value={formEditData.state}
        />
        <input type="hidden" name="state" value={formEditData.state} />
        <Button onClick={onFormSubmit} style={{ marginLeft: 8 }} type="submit" primary>SEND </Button>
      </Form>  
    </div>
  );
}
export default connect(state => state)(BlogForm)  
