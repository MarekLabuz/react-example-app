import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import debounce from 'lodash/debounce'

import { searchSongs, setSongsList, setFetching } from '../../actions/actions'

import style from './Header.scss'

const stickyThreshold = -70

class Header extends Component {
  constructor () {
    super()

    this.handleScroll = this.handleScroll.bind(this)
    this.searchBooks = debounce(this.searchBooks.bind(this), 500)
    this.handleChange = this.handleChange.bind(this)

    this.lastSearchedValue = ''

    this.state = {
      stuck: false,
      value: ''
    }
  }

  componentDidMount () {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    const { top } = this.container.getBoundingClientRect()
    const { stuck } = this.state
    if (stuck && top > stickyThreshold) {
      this.setState({ stuck: false })
    } else if (!stuck && top <= stickyThreshold) {
      this.setState({ stuck: true })
    }
  }

  searchBooks (value) {
    const { actions } = this.props
    actions.searchSongs(value, v => v === this.lastSearchedValue)
  }

  handleChange (e) {
    const { actions, isFetching } = this.props
    const value = e.currentTarget.value
    this.lastSearchedValue = value
    this.setState({ value })
    if (!isFetching) {
      actions.setFetching(true)
    }
    if (!value) {
      actions.setSongsList([])
    } else {
      this.searchBooks(value)
    }
  }

  render () {
    const { searchMode } = this.props
    const { stuck, value } = this.state
    return (
      <div
        ref={(n) => { this.container = n }}
        className={style.container}
      >
        <div
          style={
            stuck
              ? { position: 'fixed', top: stickyThreshold, boxShadow: '0px 0px 50px -15px grey' }
              : { position: 'relative', top: 0 }
          }
          className={style.search}
        >
          <span>
            {searchMode ? 'Song Search' : 'Favourities'}
          </span>
          {
            searchMode && (
              <input
                type="text"
                value={value}
                onChange={this.handleChange}
                placeholder="Enter song's name"
              />
            )
          }
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  searchMode: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    searchSongs: PropTypes.func,
    setSongsList: PropTypes.func
  }).isRequired
}

const mapStateToProps = state => ({
  searchMode: state.searchMode,
  isFetching: state.isFetching
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ searchSongs, setSongsList, setFetching }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
export const HeaderPure = Header
