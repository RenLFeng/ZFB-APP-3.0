import React from 'react'

export default function Arrow() {
  const caret = {
    display: 'block',
    width: '12px',
    height: '12px',
    borderWidth: '1px',
    borderColor: 'rgb(211, 211, 211) rgb(211, 211, 211) transparent transparent',
    borderStyle: 'solid',
    transform: 'rotate(45deg)'
  }
  return <div style={caret} />
}
