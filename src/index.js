import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from './redux'
import Game from './Game'

const store = createStore({})

// NOTE: game time should be 100ms no 2500
ReactDOM.render(<Provider store={store}><Game gameClock={30}/></Provider>,
  document.getElementById('root')
)
