import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import store from './components/Store'

/* const store = createStore(
  reducer,
  composeWithDevTools()
  )
 */

ReactDOM.render(
<Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)