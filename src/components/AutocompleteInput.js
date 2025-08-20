import React, { useState } from 'react';

export default function AutocompleteInput({ value, onChange, onSelect, placeholder }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  async function fetchSuggestions(query) {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.features) {
        setSuggestions(data.features.map(f => ({
          label: f.properties.name + (f.properties.city ? `, ${f.properties.city}` : ''),
          coords: {
            lat: f.geometry.coordinates[1],
            lng: f.geometry.coordinates[0] // <-- Fixed here
          }
        })));
      } else {
        setSuggestions([]);
      }
    } catch {
      setSuggestions([]);
    }
  }

  function onInputChange(e) {
    onChange(e.target.value);
    fetchSuggestions(e.target.value);
    setShowSuggestions(true);
  }

  function onSuggestionClick(suggestion) {
    onChange(suggestion.label);
    setShowSuggestions(false);
    if (onSelect) onSelect(suggestion.coords);
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
        autoComplete="off"
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          zIndex: 10,
          background: 'white',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          width: '100%',
          border: '1px solid #ccc',
          maxHeight: '150px',
          overflowY: 'auto',
          cursor: 'pointer'
        }}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => onSuggestionClick(s)}
              style={{ padding: '0.5em' }}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
