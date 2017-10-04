import omit from 'lodash/omit'

import { LIKE_SONG, DISLIKE_SONG, SET_SONGS_LIST, SET_FETCHING, SET_SEARCH_MODE } from '../actions/actions'

export const initialState = {
  likedSongs: {},
  songsList: [],
  searchMode: true,
  isFetching: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LIKE_SONG:
      return {
        ...state,
        likedSongs: {
          ...state.likedSongs,
          [action.payload.song.trackId]: action.payload.song
        }
      }
    case DISLIKE_SONG:
      return {
        ...state,
        likedSongs: omit(state.likedSongs, action.payload.id)
      }
    case SET_SONGS_LIST:
      return {
        ...state,
        songsList: action.payload.songsList,
        isFetching: false
      }
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.payload.isFetching
      }
    case SET_SEARCH_MODE:
      return {
        ...state,
        searchMode: action.payload.searchMode
      }
    default:
      return state
  }
}
