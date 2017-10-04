import React from 'react'

import Header from './views/Header/Header'
import SongsList from './views/SongsList/SongsList'
import NavButton from './views/NavButton/NavButton'

function App () {
  return [
    <Header key="header" />,
    <SongsList key="body" />,
    <NavButton key="navButton" />
  ]
}

export default App
