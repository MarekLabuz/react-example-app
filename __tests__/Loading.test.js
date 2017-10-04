import React from 'react'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Loading, { Loader } from '../app/components/Loading/Loading'

Enzyme.configure({ adapter: new Adapter() })

describe('<Loader />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<Loader />)

    expect(wrapper.find('.container').length).toBe(1)
    expect(wrapper.find('.container').children().every('.loader')).toBe(true)
    expect(wrapper.find('.loader').length).toBe(6)
  })
})

describe('<Loading />', () => {
  const TestChildren = () => <div>children</div>

  test('renders <Loading /> component when isFetching is true', () => {
    const wrapper = shallow(
      <Loading isFetching><TestChildren /></Loading>
    )

    expect(wrapper.find(Loader).length).toBe(1)
    expect(wrapper.find(TestChildren).length).toBe(0)
  })

  test('renders children when isFetching is false', () => {
    const wrapper = shallow(
      <Loading isFetching={false}><TestChildren /></Loading>
    )

    expect(wrapper.find(Loader).length).toBe(0)
    expect(wrapper.find(TestChildren).length).toBe(1)
  })
})
