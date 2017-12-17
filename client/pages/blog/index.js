import { Component } from 'react'
import { getBlogList, getUsersList, getUsersBlogList, setSession } from '../../actions'
import Blog from '../../containers/blog'
import { withReduxSaga } from '../../store'

class App extends Component {
  static async getInitialProps({ store, req, asPath }) { 
    const state = store.getState();
    if (req && req.session.user) {
      store.dispatch(setSession(req.session.user))
    }
    if (state.blogReducer.blog.length === 0) {
      store.dispatch(getBlogList(req ? 'server': 'localhost'))
    }
    if (state.blogReducer.users.length === 0) {
      store.dispatch(getUsersList(req ? 'server': 'localhost'))
    }
    if (state.blogReducer.userSession.id && state.blogReducer.usersBlog.length === 0) {
      store.dispatch(getUsersBlogList(req ? 'server': 'localhost'));
    }
    const params = req ? req.params.id : asPath.split('/')[2];
    return {params: params ? Number(params) : false};
  }
  render() {
    return (
      <div>
        <Blog blogId={this.props.params} />
      </div>
    )
  }
}  

export default withReduxSaga(App)
