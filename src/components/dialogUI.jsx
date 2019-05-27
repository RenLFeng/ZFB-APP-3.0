import React from 'react'
import '../assets/css/dialog.css'

const Dialog = ({
  title,
  message,
  onConfirm,
  onCancel
}) => (
  <div className='dialogWrap'>
    <div className="dialogTitle">
      {title}
    </div>
    <div className="dialogMessage">{message}</div>
    <div className="dialogButtons">
      <button className='btnLeft' onClick={onCancel}>
          取消
      </button>
      <button className='btnRight' onClick={onConfirm}>
          确定
      </button>
    </div>
  </div>
)
export default Dialog