export const LIKE_SONG = 'LIKE_SONG'
export const DISLIKE_SONG = 'DISLIKE_SONG'

export const SET_SONGS_LIST = 'SET_SONGS_LIST'
export const SET_FETCHING = 'SET_FETCHING'

export const SET_SEARCH_MODE = 'SET_SEARCH_MODE'

export const likeSong = song => ({
  type: LIKE_SONG,
  payload: {
    song
  }
})

export const dislikeSong = song => ({
  type: DISLIKE_SONG,
  payload: {
    id: song.trackId
  }
})

export const setFetching = isFetching => ({
  type: SET_FETCHING,
  payload: {
    isFetching
  }
})

export const setSongsList = songsList => ({
  type: SET_SONGS_LIST,
  payload: {
    songsList
  }
})

export const searchSongs = (text, isValid) => dispatch => (
  fetch(`https://itunes.apple.com/search?term=${text}&limit=25&entity=song&attribute=songTerm`)
    .then(res => res.json())
    .then(res => res.results)
    .catch(() => [])
    .then((data) => {
      if (isValid(text)) {
        dispatch(setSongsList(data))
      }
    })
)

export const setSearchMode = searchMode => ({
  type: SET_SEARCH_MODE,
  payload: {
    searchMode
  }
})
