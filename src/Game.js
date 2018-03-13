import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  arrowKey,
  reset,
  tick,
} from './redux'

import './Game.css'

const KEY_WHITE_LIST = /ArrowRight|ArrowLeft|ArrowUp|ArrowDown/

let _key = 0 // our render loop is deterministic so it can be global
const sprite = ({style, className}) => <div key={_key++} className={className} style={style}/>

class Game extends Component {
  keyDown = (e) => {
    if(e.key && KEY_WHITE_LIST.test(e.key)) {
      if (this.lastArrowKey !== e.key) {
        this.lastArrowKey = e.key
        this.props.dispatch(arrowKey(e.key))
      }
    }
  }

  keyUp = (e) => {
    if(e.key && KEY_WHITE_LIST.test(e.key)) {
      if (this.lastArrowKey === e.key) {
        this.lastArrowKey = null
        this.props.dispatch(arrowKey(null))
      }
    }
  }

  componentDidMount() {
    const { dispatch, gameClock } = this.props

    dispatch(dispatch(reset(this.boardEl.offsetWidth, this.boardEl.offsetHeight)))
    this.interval = setInterval(() => dispatch(tick()), gameClock)

    this.lastArrowKey = null
    document.addEventListener('keydown', this.keyDown)
    document.addEventListener('keyup', this.keyUp)
  }

  componentWillUnmount() {
    this.interval = clearInterval(this.interval)
    document.removeEventListener('keydown', this.keyDown)
    document.removeEventListener('keyup', this.keyUp)
  }

  render() {
    const { maze, prizes, ghosts, hackman, food } = this.props

    _key = 0
    return (
      <div className='animated-bg'>
        <div className='container'>
          <div className='tv'></div>
          <div className='screen'>
            <div className='board' ref={el => this.boardEl = el}>
              {maze && maze.map(sprite)}
              {hackman && hackman.map(sprite)}
              {ghosts && ghosts.map(sprite)}
              {prizes && prizes.map(sprite)}
              {food && food.map(sprite)}
              <p className="score">Score: 1234</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({maze, prizes, ghosts, hackman, food}) => ({maze, prizes, ghosts, hackman, food})
)(Game)


