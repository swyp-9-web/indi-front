import { SVGProps } from 'react';

const ArrowRightIcon = ({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_896_5474"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect x="24" y="24" width="24" height="24" transform="rotate(-180 24 24)" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_896_5474)">
      <path d="M8 2L18 12L8 22L6.225 20.225L14.45 12L6.225 3.775L8 2Z" fill="#646054" />
    </g>
  </svg>
);

export default ArrowRightIcon;
