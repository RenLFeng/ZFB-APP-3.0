import React from 'react'
import '../assets/css/header.css'

export const createHeader = ({
  onClickBack,
  title
}) => {
  return (
    <div>
      <header>
        <div className="head">
          <div className="toback" onClick={onClickBack}/>
          <h2>{title}</h2>
        </div>
      </header>
    </div>
  )
}