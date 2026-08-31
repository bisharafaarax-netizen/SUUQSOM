import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// 1. Camel Icon (Geel) - Professional Lucide-styled Dromedary camel outline
export const CamelIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 19.5v-4.5c0-.8.4-1.5 1-1.9l2-1.3.8-4.2c.2-.9.8-1.6 1.7-2l1.6-.7c.8-.4 1.8-.1 2.2.7.3.5.3 1.1.1 1.6l-1 2.5c-.2.5 0 1 .4 1.4 1.3 1 3.2.8 4.5-.3 1.4-1.2 3.4-1.3 4.9-.2 1.3 1 1.8 2.6 1.5 4.2l-.5 2.1c-.2.8-.7 1.5-1.4 1.9L20 19.5" />
    <path d="M4.5 19.5v-3" />
    <path d="M8.5 19.5v-4" />
    <path d="M15.5 19.5v-3.5" />
    <path d="M19.5 19.5v-2" />
    <circle cx="10" cy="5.5" r="0.5" fill="currentColor" />
  </svg>
);

// 2. Cow / Cattle Icon (Lo') - Professional bovine head with curved horns and muzzle
export const CowIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Horns */}
    <path d="M4 4c1 2.8 3 4.8 5.5 5.5" />
    <path d="M20 4c-1 2.8-3 4.8-5.5 5.5" />
    {/* Ears */}
    <path d="M3 10c1.5 0 2.8.8 3.5 2" />
    <path d="M21 10c-1.5 0-2.8.8-3.5 2" />
    {/* Head & Forehead */}
    <path d="M9.5 9.5h5" />
    <path d="M6.5 12c0 3 1.8 5.5 3.5 6.5" />
    <path d="M17.5 12c0 3-1.8 5.5-3.5 6.5" />
    {/* Muzzle */}
    <rect x="8" y="16" width="8" height="5" rx="2.5" />
    <circle cx="10" cy="18.5" r="0.75" fill="currentColor" />
    <circle cx="14" cy="18.5" r="0.75" fill="currentColor" />
    {/* Eyes */}
    <circle cx="8.5" cy="12.5" r="0.8" fill="currentColor" />
    <circle cx="15.5" cy="12.5" r="0.8" fill="currentColor" />
  </svg>
);

export const CattleIcon = CowIcon;

// 3. Goat / Sheep Icon (Ari / Riyo) - Professional goat head with curved horns
export const GoatIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Curved back horns */}
    <path d="M7 4c2 1 3.5 2.8 3.8 5" />
    <path d="M17 4c-2 1-3.5 2.8-3.8 5" />
    {/* Ears */}
    <path d="M3.5 8.5C5.5 9 7 10.5 7.5 12" />
    <path d="M20.5 8.5C18.5 9 17 10.5 16.5 12" />
    {/* Tapered face */}
    <path d="M7.5 11l2.5 8h4l2.5-8" />
    <path d="M10 19l2 2 2-2" />
    {/* Eyes */}
    <circle cx="9.5" cy="12.5" r="0.8" fill="currentColor" />
    <circle cx="14.5" cy="12.5" r="0.8" fill="currentColor" />
    <path d="M11 17h2" />
  </svg>
);

// 4. Horse Icon (Fardo) - Professional stallion / horse head profile
export const HorseIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M5 20c1-4 3-7 5-9l1-6 3 1-1 3 3 1.5c1 .5 2 1.5 2 2.7v1.8c0 .5-.3 1-.7 1.3l-2.6 1.7H13l-1 5" />
    <path d="M18 10l2 1.5c.6.5.6 1.5 0 2l-3 2.5" />
    <path d="M5 20h8" />
    <circle cx="14.5" cy="8.5" r="0.75" fill="currentColor" />
  </svg>
);

// 5. Chicken / Poultry Icon (Digaag) - Professional rooster/chicken outline
export const ChickenIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Comb */}
    <path d="M13 3c-.5 1-1.5 1.5-1.5 2.5 0 .8.5 1.5 1.5 1.5" />
    <path d="M15 4c-.5.8-1 1.2-1 2" />
    {/* Head & Beak */}
    <path d="M12 7c-1 0-2 .8-2 2v2c0 2 1.5 4 4 4h2c2.5 0 4-2 4-5 0-2-1.5-3-3-3h-5z" />
    <path d="M8 9l-3 1.5L8 12" />
    {/* Wattle */}
    <path d="M8.5 12c0 1 .5 1.8 1.5 1.8" />
    {/* Body & Tail */}
    <path d="M10 13c-3 1-5 3.5-5 7h14c0-3-2-5.5-5-7" />
    <path d="M18 11c2-1 3-3 3-5" />
    <path d="M19 13c2 0 3-1 3-3" />
    {/* Legs */}
    <path d="M9 20v2.5" />
    <path d="M15 20v2.5" />
    {/* Eye */}
    <circle cx="11" cy="9.5" r="0.75" fill="currentColor" />
  </svg>
);

// 6. Livestock / General Animal Icon (Xoolo kale) - Clean livestock outline
export const LivestockIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Quadruped stylized livestock animal */}
    <path d="M4 18v-5c0-1.5 1.2-2.8 2.7-3L10 9.5l2-4.5 3 1.5-1.2 3.5h3.5c1.8 0 3.2 1.5 3.2 3.2V18" />
    <path d="M6 18v-3" />
    <path d="M9 18v-4" />
    <path d="M15 18v-4" />
    <path d="M18 18v-3" />
    <path d="M20.5 13.5c.8 0 1.5.7 1.5 1.5v1" />
    <circle cx="13" cy="7.5" r="0.6" fill="currentColor" />
  </svg>
);

// 7. Land / Farm / Agriculture Icon (Dhul / Beeraha)
export const LandFarmIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Sprout & sun / plot boundary */}
    <path d="M12 3a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" />
    <circle cx="12" cy="6" r="1" fill="currentColor" />
    <path d="M2 19l6-3 4 2 6-3 4 2" />
    <path d="M2 14l6-2 4 2 6-3 4 2" />
    <path d="M2 21h20" />
    <path d="M8 16v5" />
    <path d="M16 14.5v6.5" />
  </svg>
);

export const LandIcon = LandFarmIcon;

// 8. Vehicle / Car Icon (Gaadiid)
export const VehicleIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 14l1.5-4.5a2 2 0 0 1 1.9-1.5h11.2a2 2 0 0 1 1.9 1.5L21 14v4a1 1 0 0 1-1 1h-1.5" />
    <path d="M5.5 19H3a1 1 0 0 1-1-1v-4" />
    <path d="M5 11h14" />
    <path d="M12 8v3" />
    <circle cx="7.5" cy="18.5" r="2.5" />
    <circle cx="16.5" cy="18.5" r="2.5" />
    <path d="M20.5 13.5h1" />
  </svg>
);

// 9. House / Real Estate Icon (Guryo)
export const HouseIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 10.5 12 3l9 7.5v9.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
    <path d="M9 21v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7" />
    <path d="M18 7v-2h-2" />
  </svg>
);

// 10. Electronics Icon (Electronics)
export const ElectronicsIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Laptop / Screen */}
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M2 19h20" />
    <path d="M10 16v3" />
    <path d="M14 16v3" />
    {/* Phone preview accent */}
    <line x1="10" y1="8" x2="14" y2="8" />
  </svg>
);

// 11. Clothes / Fashion Icon (Dharka)
export const ClothingIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.5a2 2 0 0 0 1.5 1.62l1.64.44V20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8.75l1.64-.44a2 2 0 0 0 1.5-1.62l.58-3.5a2 2 0 0 0-1.34-2.23z" />
    <path d="M12 2v6" />
  </svg>
);

// 12. Furniture Icon (Alaabta Guriga)
export const FurnitureIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Armchair / Sofa */}
    <path d="M5 9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5H5V9z" />
    <path d="M2 13a2 2 0 0 1 2-2h1v6H4a2 2 0 0 1-2-2z" />
    <path d="M22 13a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2z" />
    <path d="M4 17v3" />
    <path d="M20 17v3" />
    <path d="M5 14h14" />
  </svg>
);

// 13. Jobs / Work Icon (Shaqooyin)
export const JobsIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

// 14. Services & Tools Icon (Adeegyo)
export const ServicesIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

// 15. Food / Groceries Icon (Cunto)
export const FoodIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
    <path d="M15 11v11" />
    <path d="M5 2v4a3 3 0 0 0 3 3h1V2" />
    <path d="M7 9v13" />
  </svg>
);

// 16. Shop / Store Icon (Dukaamo)
export const StoreIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <circle cx="9" cy="11.5" r="1.5" />
    <circle cx="15" cy="11.5" r="1.5" />
  </svg>
);
