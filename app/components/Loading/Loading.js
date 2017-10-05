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

function Loading ({ condition, children }) {
  return (
    condition
      ? <Loader />
      : children
  )
}

Loading.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default Loading
