import React from 'react';
import './TagItem.css';
import AimIcon from '../../assets/images/AimIcon.svg';

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
      <img src={AimIcon} alt="AimIcon" className="tag-icon" />
      <span className="tag-text">{text}</span>
    </div>
  );
};

export default TagItem;
