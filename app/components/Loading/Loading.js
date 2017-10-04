import React from 'react'
import PropTypes from 'prop-types'

import style from './Loading.scss'

export function Loader () {
  return (
    <div className={style.container}>
      <div className={style.loader} />
      <div className={style.loader} />
      <div className={style.loader} />
      <div className={style.loader} />
      <div className={style.loader} />
      <div className={style.loader} />
    </div>
  )
}

function Loading ({ isFetching, children }) {
  return (
    isFetching
      ? <Loader />
      : children
  )
}

Loading.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default Loading
