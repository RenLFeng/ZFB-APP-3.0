import React from 'react'
import Dialog from '../components/dialogUI'
import ReactDOM from 'react-dom'
const staticize = props =>
  new Promise((fulfill) => {
    // console.log(...props)
    const holder = document.createElement('div')
    holder.setAttribute('class','dialogCover')
    document.body.appendChild(holder)
    
    const close = () => {
      document.body.removeChild(holder)
    }

    ReactDOM.render(
      <Dialog
        {...props}
        onCancel={close}
        onConfirm={() => {
          close()
          fulfill()
        }}
      />,
      holder
    )
  })

export default staticize