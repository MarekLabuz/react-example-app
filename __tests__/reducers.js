import reducer, { initialState } from '../app/reducers/reducers'
import * as actions from '../app/actions/actions'

describe('reducers', () => {
  const reducerTest = (fn, arg, init, result) => {
    expect(reducer({
      ...initialState,
      ...init
    }, fn(arg))).toEqual({
      ...initialState,
      ...result
    })
  }

  test('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  test('handles LIKE_SONG', () => {
    const song1 = { trackId: 1 }
    reducerTest(actions.likeSong, song1, undefined, { likedSongs: { 1: song1 } })

    const song2 = { trackId: 2 }
    reducerTest(
      actions.likeSong,
      song2,
      { likedSongs: { 1: song1 } },
      { likedSongs: { 1: song1, 2: song2 } }
    )
  })

  test('handles DISLIKE_SONG', () => {
    const song1 = { trackId: 1 }
    const song2 = { trackId: 2 }
    reducerTest(
      actions.dislikeSong,
      { trackId: 1 },
      { likedSongs: { 1: song1, 2: song2 } },
      { likedSongs: { 2: song2 } }
    )

    reducerTest(
      actions.dislikeSong,
      { trackId: 2 },
      { likedSongs: { 2: song2 } },
      { likedSongs: {} }
    )
  })

  test('handles SET_SONGS_LIST', () => {
    const songsList = [{ trackId: 1 }, { trackId: 2 }]
    reducerTest(
      actions.setSongsList,
      songsList,
      { isFetching: true },
      { isFetching: false, songsList }
    )
  })

  test('handles SET_FETCHING', () => {
    reducerTest(actions.setFetching, false, { isFetching: true }, { isFetching: false })
  })

  test('handles SET_SEARCH_MODE', () => {
    reducerTest(actions.setSearchMode, true, { searchMode: false }, { searchMode: true })
  })
})
