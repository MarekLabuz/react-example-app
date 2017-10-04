import React from 'react'

import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { SongsListPure } from '../app/views/SongsList/SongsList'
import SongRecord, { Label } from '../app/views/SongsList/SongRecord/SongRecord'

import HeartIcon from '../app/shared/icons/Heart'

Enzyme.configure({ adapter: new Adapter() })

describe('<SongsList />', () => {
  const setup = (props, render = mount) => render(<SongsListPure {...props} />)

  test('renders correctly', () => {
    let wrapper = setup({ data: [], isFetching: true, likedSongs: {}, actions: {} })

    expect(wrapper.children().length).toBe(1)
    expect(wrapper.find('ul').length).toBe(0)

    wrapper.setProps({ isFetching: false })
    expect(wrapper.find('ul.list').length).toBe(1)

    wrapper = setup(
      {
        data: [{ trackId: 1 }, { trackId: 2 }, { trackId: 3 }],
        isFetching: false,
        likedSongs: {},
        actions: {}
      },
      shallow
    )
    expect(wrapper.find('ul').length).toBe(1)
    expect(wrapper.find('ul').children().length).toBe(3)
    expect(wrapper.find('li').length).toBe(3)
    expect(wrapper.find(SongRecord).length).toBe(3)
  })
})

describe('<SongRecord />', () => {
  const setup = (props, render = mount) => {
    const song = {
      trackId: 1,
      trackName: 'trackName',
      artistName: 'artistName',
      collectionName: 'collectionName',
      primaryGenreName: 'primaryGenreName',
      artworkUrl100: 'artworkUrl100'
    }
    const actions = {
      likeSong: jest.fn(),
      dislikeSong: jest.fn()
    }
    const wrapper = render(<SongRecord song={song} actions={actions} {...props} />)
    return { wrapper, actions, song }
  }

  test('renders correctly', () => {
    const { wrapper, actions, song } = setup({ likedSongs: {} })

    expect(actions.likeSong.mock.calls.length).toBe(0)
    expect(actions.dislikeSong.mock.calls.length).toBe(0)
    expect(wrapper.find(Label).length).toBe(4)
    expect(wrapper.find(HeartIcon).length).toBe(1)
    expect(wrapper.find('img').length).toBe(1)

    expect(wrapper.find(HeartIcon).props().style).toEqual({ fill: 'white' })

    wrapper.setProps({ likedSongs: { 1: song } })
    expect(wrapper.find(HeartIcon).props().style).toEqual({ fill: 'red' })
  })

  test('likes/dislikes a song on click', () => {
    const { wrapper, actions, song } = setup({ likedSongs: {} })

    wrapper.find('.heartIcon').simulate('click')
    wrapper.setProps({ likedSongs: { 1: song } })

    expect(actions.likeSong.mock.calls.length).toBe(1)
    expect(actions.likeSong.mock.calls[0][0]).toBe(song)
    expect(actions.dislikeSong.mock.calls.length).toBe(0)

    wrapper.find('.heartIcon').simulate('click')
    wrapper.setProps({ likedSongs: {} })
    expect(actions.likeSong.mock.calls.length).toBe(1)
    expect(actions.dislikeSong.mock.calls.length).toBe(1)
    expect(actions.dislikeSong.mock.calls[0][0]).toBe(song)
  })
})
