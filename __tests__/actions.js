import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetch from 'isomorphic-fetch'

import * as actions from '../app/actions/actions'

const mockStore = configureMockStore([thunk])
window.fetch = fetch

describe('actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('async searchSongs', () => {
    const text = 'song'
    const songsLists = [{ trackId: 1 }, { trackId: 2 }]
    nock('https://itunes.apple.com')
      .get('/search')
      .query({ term: text, limit: 25, entity: 'song', attribute: 'songTerm' })
      .reply(200, { results: songsLists })

    const store = mockStore({ songsLists: [] })

    return store.dispatch(actions.searchSongs(text, () => true)).then(() => {
      expect(store.getActions()).toEqual([actions.setSongsList(songsLists)])
    })
  })
})
