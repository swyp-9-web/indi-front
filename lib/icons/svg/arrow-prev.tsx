import { SVGProps } from 'react';

const ArrowLeftIcon = ({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_896_5459"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_896_5459)">
      <path d="M16 22L6 12L16 2L17.775 3.775L9.55 12L17.775 20.225L16 22Z" fill="#646054" />
    </g>
  </svg>
);

export default ArrowLeftIcon;
