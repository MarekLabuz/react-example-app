import React from 'react'

import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { HeaderPure } from '../app/views/Header/Header'

Enzyme.configure({ adapter: new Adapter() })

const timer = time => new Promise(resolve => setTimeout(resolve, time))

describe('<Header />', () => {
  const setup = (render = shallow) => {
    const actions = {
      searchSongs: jest.fn(),
      setFetching: jest.fn(),
      setSongsList: jest.fn()
    }
    const wrapper = render(<HeaderPure searchMode isFetching={false} actions={actions} />)
    return { wrapper, actions }
  }

  test('renders correctly', () => {
    const { wrapper } = setup()

    expect(wrapper.find('.container').length).toBe(1)
    const search = wrapper.find('.search')
    expect(search.length).toBe(1)
    expect(search.props().style).toEqual({ position: 'relative', top: 0 })
    expect(search.childAt(0).is('span')).toBe(true)
    expect(search.childAt(0).text()).toBe('Song Search')
    expect(search.childAt(1).length).toBe(1)
    expect(search.childAt(1).is('input')).toBe(true)
  })

  test('searches books on input change', async (done) => {
    const { wrapper, actions } = setup()

    const input = wrapper.find('input')
    input.simulate('change', { currentTarget: { value: 'song' } })
    await timer(600)
    expect(wrapper.state()).toEqual({ stuck: false, value: 'song' })
    expect(actions.setFetching.mock.calls.length).toBe(1)
    expect(actions.setSongsList.mock.calls.length).toBe(0)
    expect(actions.searchSongs.mock.calls.length).toBe(1)

    input.simulate('change', { currentTarget: { value: '' } })
    await timer(600)
    expect(wrapper.state()).toEqual({ stuck: false, value: '' })
    expect(actions.setFetching.mock.calls.length).toBe(2)
    expect(actions.setSongsList.mock.calls.length).toBe(1)
    expect(actions.searchSongs.mock.calls.length).toBe(1)

    done()
  })

  test('multiple consecutive input changes trigger only one fetch', async (done) => {
    const { wrapper, actions } = setup()

    const input = wrapper.find('input')
    input.simulate('change', { currentTarget: { value: 's' } })
    expect(actions.setFetching.mock.calls.length).toBe(1)
    wrapper.setProps({ isFetching: true })
    await timer(100)
    input.simulate('change', { currentTarget: { value: 'so' } })
    expect(actions.setFetching.mock.calls.length).toBe(1)
    await timer(100)
    input.simulate('change', { currentTarget: { value: 'son' } })
    expect(actions.setFetching.mock.calls.length).toBe(1)
    await timer(100)
    input.simulate('change', { currentTarget: { value: 'song' } })
    expect(actions.setFetching.mock.calls.length).toBe(1)
    await timer(600)
    expect(wrapper.state()).toEqual({ stuck: false, value: 'song' })
    expect(actions.setFetching.mock.calls.length).toBe(1)
    expect(actions.setSongsList.mock.calls.length).toBe(0)
    expect(actions.searchSongs.mock.calls.length).toBe(1)

    done()
  })

  test('style changes when stuck', () => {
    const { wrapper } = setup(mount)

    wrapper.setState({ stuck: true })

    expect(wrapper.find('.search').props().style)
      .toEqual({ position: 'fixed', top: -70, boxShadow: '0px 0px 50px -15px grey' })

    wrapper.setState({ stuck: false })
    expect(wrapper.find('.search').props().style).toEqual({ position: 'relative', top: 0 })
  })
})
