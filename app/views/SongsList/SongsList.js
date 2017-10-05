import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loading from '../../components/Loading/Loading'
import SongRecord from './SongRecord/SongRecord'

import { likeSong, dislikeSong } from '../../actions/actions'

import style from './SongsList.scss'

function SongsList ({ data, isFetching, searchMode, likedSongs, actions }) {
  return (
    <Loading condition={isFetching && searchMode}>
      <ul className={style.list}>
        {data.map(song => (
          <li key={song.trackId}>
            <SongRecord song={song} likedSongs={likedSongs} actions={actions} />
          </li>
        ))}
      </ul>
    </Loading>
  )
}

SongsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.number
  })).isRequired,
  isFetching: PropTypes.bool.isRequired,
  likedSongs: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    likeSong: PropTypes.func,
    dislikeSong: PropTypes.func
  }).isRequired,
  searchMode: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  data: state.searchMode ? state.songsList : Object.values(state.likedSongs),
  likedSongs: state.likedSongs,
  isFetching: state.isFetching,
  searchMode: state.searchMode
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ likeSong, dislikeSong }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SongsList)
export const SongsListPure = SongsList
