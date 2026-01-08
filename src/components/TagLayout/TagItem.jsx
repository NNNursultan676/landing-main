import React from 'react';
import './TagItem.css';

const TagItem = ({ text, position, key }) => {
  const { row, col, colSpan, overlapColumns } = position;

  // Determine grid column end
  const gridColumnEnd = overlapColumns
    ? col + 2
    : colSpan
    ? col + colSpan
    : undefined;

  return (
    <div
      className={`tag-item`}
      style={{
        gridColumnStart: col,
        gridColumnEnd: gridColumnEnd,
        gridRowStart: row,
        justifySelf: overlapColumns ? 'center' : colSpan ? 'center' : 'start',
        transform: overlapColumns ? 'translateX(-50%)' : undefined,
      }}
    >
      <div className="tag-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2L10.5 6.5L15.5 7.5L12 11L12.5 16L8 13.5L3.5 16L4 11L0.5 7.5L5.5 6.5L8 2Z" fill="currentColor" opacity="0.9"/>
        </svg>
      </div>
      <span className="tag-text">{text}</span>
    </div>
  );
};

export default TagItem;
