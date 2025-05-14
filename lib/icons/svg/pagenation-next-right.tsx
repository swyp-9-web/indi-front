import { SVGProps } from 'react';

const PageRightArrowIcon = ({
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_1858_3626"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect x="24" y="24" width="24" height="24" transform="rotate(-180 24 24)" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_1858_3626)">
      <path d="M8 2L18 12L8 22L6.225 20.225L14.45 12L6.225 3.775L8 2Z" fill="currentColor" />
    </g>
  </svg>
);

export default PageRightArrowIcon;
