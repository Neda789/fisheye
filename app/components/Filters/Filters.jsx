'use client';

import { useState } from 'react';

export default function Filters({ medias, onSort }) {
  const [sortBy, setSortBy] = useState('likes');
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'likes', label: 'Popularité' },
    { value: 'date', label: 'Date' },
    { value: 'title', label: 'Titre' },
  ];

  const handleSort = (value) => {
    setSortBy(value);
    setIsOpen(false);
    const sorted = [...medias].sort((a, b) => {
      if (value === 'likes') return b.likes - a.likes;
      if (value === 'date') return new Date(b.date) - new Date(a.date);
      if (value === 'title') return a.title.localeCompare(b.title);
    });
    onSort(sorted);
  };

  return (
    <div className="sort-container">
      <label>Trier par</label>
      <div className="custom-select">
        <div className="custom-select-selected" onClick={() => setIsOpen(!isOpen)}>
          {options.find(o => o.value === sortBy)?.label}
          <span className="arrow">{isOpen ? '∧' : '∨'}</span>
        </div>
        {isOpen && (
          <div className="custom-select-options">
            {options.filter(o => o.value !== sortBy).map((option, index, arr) => (
              <div
                key={option.value}
                className={`custom-select-option ${index !== arr.length - 1 ? 'with-border' : ''}`}
                onClick={() => handleSort(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}