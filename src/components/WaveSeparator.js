import React from 'react';

export default function WaveSeparator({ color = '#e3f0fd', height = 80, flip = false }) {
  return (
    <div className="wave-separator" style={{ transform: flip ? 'scaleY(-1)' : undefined }}>
      <svg 
        viewBox={`0 0 1440 ${height}`} 
        preserveAspectRatio="none" 
        style={{ width: '100%', height }}
        aria-hidden="true"
      >
        <path 
          d={`M0,0 Q700,${height - 30} 1440,0 L1440,${height} L0,${height} Z`} 
          fill={color} 
        />
      </svg>
    </div>
  );
}
