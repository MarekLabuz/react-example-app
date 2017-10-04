import React from 'react'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { NavButtonPure } from '../app/views/NavButton/NavButton'

Enzyme.configure({ adapter: new Adapter() })

describe('<Loader />', () => {
  const setup = (searchMode) => {
    const actions = {
      setSearchMode: jest.fn()
    }
    const wrapper = shallow(<NavButtonPure searchMode={searchMode} actions={actions} />)
    return { wrapper, actions }
  }

  test('renders correctly', () => {
    const { wrapper } = setup(true)

    expect(wrapper.props().className).toBe('button')
    expect(wrapper.props().style).toEqual({ right: '5%' })
    expect(wrapper.children().text()).toBe('Go to Favourities ➜')

    wrapper.setProps({ searchMode: false })

    expect(wrapper.props().style).toEqual({ left: '5%' })
    expect(wrapper.childAt(0).is('div')).toBe(true)
    expect(wrapper.childAt(0).props().className).toBe('flippedArrow')
    expect(wrapper.childAt(1).text()).toBe('Go to Song Search')
  })

  test('setSearchMode function is triggered on click', () => {
    const { wrapper, actions } = setup(true)

    expect(actions.setSearchMode.mock.calls.length).toBe(0)
    wrapper.simulate('click')
    expect(actions.setSearchMode.mock.calls.length).toBe(1)
    expect(actions.setSearchMode.mock.calls[0][0]).toBe(false)

    wrapper.setProps({ searchMode: false })
    wrapper.simulate('click')
    expect(actions.setSearchMode.mock.calls.length).toBe(2)
    expect(actions.setSearchMode.mock.calls[1][0]).toBe(true)
  })
})
