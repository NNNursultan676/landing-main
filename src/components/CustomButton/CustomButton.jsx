import React from 'react'
import './CustomButton.css';

const CustomButton = ({ title, styleName, onClick }) => {
  return (
    <button className={`${styleName} customButtonStyle`} onClick={onClick}>
      {title}
    </button>
  )
}

export default CustomButton
