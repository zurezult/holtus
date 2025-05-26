import React from 'react';
import './SliderComponent.css';

export default function SliderComponent({ 
  title, 
  value, 
  onChange, 
  readOnly = false, 
  name 
}) {
  return (
    <div className="slider-container">
      <label className="slider-label">
        <span>{title}</span>
        <div className="slider-value">{value}</div>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        step="5"
        value={value}
        name={name}
        onChange={readOnly ? undefined : onChange}
        disabled={readOnly}
        className="slider-input"
      />
    </div>
  );
}
