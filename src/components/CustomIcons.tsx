import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// Camel Icon (Geel)
export const CamelIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Stylized recognizable camel silhouette */}
    <path d="M4 18v-4l2-2 1-5 2-1 2 2v2c1-2 3-3 5-2 1.5.8 2 2.5 1.5 4 1.5-1 3.5-.5 4.5 1 .8 1.2.5 3-.5 4.5L20 18" />
    <path d="M4 18h2v-3" />
    <path d="M18 18h2v-3" />
    <circle cx="8" cy="7" r="0.8" fill="currentColor" />
  </svg>
);

// Cattle / Cow Icon (Lo')
export const CattleIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Stylized cattle with horns and head */}
    <path d="M5 8c0-3 3-5 7-5s7 2 7 5" />
    <path d="M3 6c1 1 2 3 2 5 0 4 3 8 7 8s7-4 7-8c0-2 1-4 2-5" />
    <path d="M9 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
    <path d="M15 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
    <path d="M9 16c1 1 2 1.5 3 1.5s2-.5 3-1.5" />
    <ellipse cx="12" cy="16.5" rx="3.5" ry="2" />
  </svg>
);

// Goat / Sheep Icon (Ari)
export const GoatIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Stylized goat with curved horns and ears */}
    <path d="M4 7c2-3 5-4 7-2" />
    <path d="M20 7c-2-3-5-4-7-2" />
    <path d="M6 10l6 9 6-9c0-3-2.7-6-6-6s-6 3-6 6z" />
    <circle cx="9" cy="11" r="1" fill="currentColor" />
    <circle cx="15" cy="11" r="1" fill="currentColor" />
    <path d="M11 15h2" />
    <path d="M12 15v2" />
  </svg>
);

// Land / Real Estate Icon (Dhul) - matching reference design
export const LandIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="m3 16 6-6 4 4 8-8" />
    <path d="m14 6 7 0 0 7" />
    <path d="M3 20h18" />
  </svg>
);

// House Icon (Guri) - matching reference design
export const HouseIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
    <path d="M9 21V12h6v9" />
    <path d="M9 7h6" />
  </svg>
);

// Vehicle Icon (Gaadiid) - matching reference design
export const VehicleIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M5 17H3v-4l2-5h14l2 5v4h-2" />
    <circle cx="7.5" cy="17.5" r="2.5" />
    <circle cx="16.5" cy="17.5" r="2.5" />
    <path d="M7 8h10" />
    <path d="M6 13h12" />
  </svg>
);

// Services / Other items Icon (Adeegyo Kale)
export const ServicesIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="6" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="18" cy="12" r="2" fill="currentColor" />
  </svg>
);
