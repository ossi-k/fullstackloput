import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './components/Store'
/*import { initialAnecdotes } from './reducers/anecdoteReducer'
import anecdotes from './services/anecdotes'
import anecdoteService from './services/anecdotes'*/


/*anecdoteService.getAll().then(anecdotes =>
  store.dispatch(initialAnecdotes(anecdotes))
)*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)