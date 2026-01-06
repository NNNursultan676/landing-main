import React from 'react';
import './CustomText.css';

const CustomText = ({ text, highlightedParts = [], highlightClass = "highlight", className = "" }) => {
  const renderText = () => {
    if (highlightedParts.length === 0) {
      return <span>{text}</span>;
    }

    const parts = text.split(new RegExp(`(${highlightedParts.join('|')})`, 'gi'));

    return parts.map((part, index) =>
      highlightedParts.includes(part) ? (
        <span key={index} className={highlightClass}>
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return <p className={className}>{renderText()}</p>;
};

export default CustomText;
