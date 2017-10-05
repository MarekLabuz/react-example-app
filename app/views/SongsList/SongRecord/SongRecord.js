import React from 'react'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'

import HeartIcon from '../../../shared/icons/Heart'

import style from './SongRecord.scss'

export function Label ({ label, value }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ minWidth: 65 }}>{label}:</div>
      <div>{value}</div>
    </div>
  )
}

Label.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

const parseSong = song => pick(
  song,
  ['trackId', 'artworkUrl100', 'trackName', 'artistName', 'collectionName', 'primaryGenreName']
)

function SongRecord ({ song, likedSongs, actions }) {
  const isLiked = Object.hasOwnProperty.call(likedSongs, song.trackId)
  return (
    <div className={style.songRecord}>
      <div style={{ marginRight: 10 }}>
        <img alt="artwork" src={song.artworkUrl100} style={{ borderRadius: 5 }} />
      </div>
      <div style={{ flex: 1 }}>
        <Label label="Name" value={song.trackName} />
        <Label label="Artist" value={song.artistName} />
        <Label label="Album" value={song.collectionName} />
        <Label label="Genre" value={song.primaryGenreName} />
      </div>
      <div
        role="button"
        className={style.heartIcon}
        onClick={() => (isLiked ? actions.dislikeSong(song) : actions.likeSong(parseSong(song)))}
        tabIndex="-1"
      >
        <HeartIcon style={{ fill: isLiked ? 'red' : 'white' }} />
      </div>
    </div>
  )
}

SongRecord.propTypes = {
  song: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    primaryGenreName: PropTypes.string
  }).isRequired,
  likedSongs: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    likeSong: PropTypes.func,
    dislikeSong: PropTypes.func
  }).isRequired
}

export default SongRecord
