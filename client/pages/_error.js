import { Component } from 'react'
import { getBlogList, getUsersList, getUsersBlogList, setSession } from '../actions'
import Error from '../containers/error'
import { withReduxSaga } from '../store'

class App extends Component {
  static async getInitialProps({ store, req }) { 
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
  }
  render() {
    return (
      <Error />
    )
  }
}
export default withReduxSaga(App)
