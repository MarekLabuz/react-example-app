import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setSearchMode } from '../../actions/actions'

import style from './NavButton.scss'

function NavButton ({ searchMode, actions }) {
  return (
    <div
      role="button"
      tabIndex="-1"
      className={style.button}
      style={{ [searchMode ? 'right' : 'left']: '5%' }}
      onClick={() => actions.setSearchMode(!searchMode)}
    >
      {
        searchMode
          ? 'Go to Favourities ➜'
          : [<div key="a" className={style.flippedArrow}>➜</div>, 'Go to Song Search']
      }
    </div>
  )
}

NavButton.propTypes = {
  searchMode: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    setSearchMode: PropTypes.func
  }).isRequired
}

const mapStateToProps = state => ({
  searchMode: state.searchMode
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setSearchMode }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NavButton)
export const NavButtonPure = NavButton
