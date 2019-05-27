import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/index'
import Modal from 'react-modal'

const Root = document.getElementById('root')
Modal.setAppElement(Root)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  Root
)
