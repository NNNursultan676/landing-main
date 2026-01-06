import React from 'react';
import TagItem from './TagItem';
import './Taglayout.css';
import { useTranslation } from 'react-i18next';

const TagLayout = () => {
  const { t } = useTranslation();

  const tags = [
    t('tag1'),
    t('tag2'),
    t('tag3'),
    t('tag4'),
    t('tag5'),
    t('tag6'),
    t('tag7'),
    t('tag8'),
    t('tag9'),
    t('tag10'),
  ];

  // Define fixed positions for each tag
  const positions = [
    { row: 1, col: 5, overlapColumns: true }, // tag1
    { row: 1, col: 2, colSpan: 2 }, // tag2
    { row: 2, col: 4, overlapColumns: true }, // tag3
    { row: 2, col: 2 }, // tag4
    { row: 3, col: 3, olSpan: 2 }, // tag5
    { row: 3, col: 5, overlapColumns: true }, // tag6
    { row: 4, col: 4, colSpan: 2 }, // tag7
    { row: 4, col: 2, overlapColumns: true }, // tag8
    { row: 5, col: 5 }, // tag9
    { row: 5, col: 3 }, // tag10
  ];

  // Map tags to positions
  const tagsWithPositions = tags.map((tag, index) => ({
    text: tag,
    position: positions[index],
  }));

  return (
    <div className="tag-layout">
      {tagsWithPositions.map((tag, index) => (
        <TagItem key={tag.index} text={tag.text} position={tag.position} />
      ))}
    </div>
  );
};

export default TagLayout;
