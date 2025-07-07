import React from "react";

// A generic type for our SVG icon props
type IconProps = React.SVGProps<SVGSVGElement>;

export const CogIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z' />
    <path d='M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z' />
    <path d='M12 2v2' />
    <path d='M12 22v-2' />
    <path d='m17 20.66-1-1.73' />
    <path d='M11 10.27 7 3.34' />
    <path d='m20.66 17-1.73-1' />
    <path d='m3.34 7 1.73 1' />
    <path d='M14 12h8' />
    <path d='M2 12h2' />
    <path d='m20.66 7-1.73 1' />
    <path d='m3.34 17 1.73-1' />
    <path d='m17 3.34-1 1.73' />
    <path d='M11 13.73 7 20.66' />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <circle cx='11' cy='11' r='8' />
    <path d='m21 21-4.3-4.3' />
  </svg>
);

export const ZapIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
  </svg>
);

export const TruckIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11' />
    <path d='M14 9h4l4 4v4c0 .6-.4 1-1 1h-2' />
    <circle cx='7' cy='18' r='2' />
    <circle cx='17' cy='18' r='2' />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <rect width='20' height='14' x='2' y='7' rx='2' ry='2' />
    <path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' />
  </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
    <path d='m9 12 2 2 4-4' />
  </svg>
);

export const BarChartIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <line x1='12' x2='12' y1='20' y2='10' />
    <line x1='18' x2='18' y1='20' y2='4' />
    <line x1='6' x2='6' y1='20' y2='16' />
  </svg>
);
