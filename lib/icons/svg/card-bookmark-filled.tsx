import { SVGProps } from 'react';

const CardBookmarkFilledIcon = ({
  size = 40,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    filter="url(#filter0_d)"
    {...props}
  >
    <mask
      id="mask0"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="40"
      height="40"
    >
      <rect width="40" height="40" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0)">
      <path
        d="M9.16675 33.7499V8.33323C9.16675 7.6224 9.42175 7.01017 9.93175 6.49656C10.4417 5.98323 11.0558 5.72656 11.7738 5.72656H28.2263C28.9444 5.72656 29.5584 5.98323 30.0684 6.49656C30.5784 7.01017 30.8334 7.6224 30.8334 8.33323V33.7499L20.0001 29.1024L9.16675 33.7499Z"
        fill="#F9F7F0"
      />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="5.16663"
        y="1.72656"
        width="29.6666"
        height="36.0234"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0.3 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default CardBookmarkFilledIcon;
