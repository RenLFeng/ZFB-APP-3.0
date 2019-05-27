import React from 'react'

export const createCover = contentBuilder => {
  if (typeof contentBuilder !== 'function') {
    throw new Error('please pass a function!')
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'rgba(127,127,127,0.5)',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      {contentBuilder()}
    </div>
  )
}
