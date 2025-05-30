import { SVGProps } from 'react';

const CardBookmarkIcon = ({ size = 40, ...props }: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d)">
      <g opacity="0.3">
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
            d="M9.16663 33.7499V8.33323C9.16663 7.6224 9.42163 7.01017 9.93163 6.49656C10.4416 5.98323 11.0557 5.72656 11.7737 5.72656H28.2262C28.9443 5.72656 29.5583 5.98323 30.0683 6.49656C30.5783 7.01017 30.8333 7.6224 30.8333 8.33323V33.7499L20 29.1024L9.16663 33.7499Z"
            fill="#646054"
          />
        </g>
      </g>
      <mask
        id="mask1"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="40"
        height="40"
      >
        <rect width="40" height="40" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask1)">
        <path
          d="M9.16663 33.7499V8.33323C9.16663 7.6224 9.42204 7.01017 9.93288 6.49656C10.4437 5.98323 11.0573 5.72656 11.7737 5.72656H28.2262C28.9426 5.72656 29.5562 5.98323 30.067 6.49656C30.5779 7.01017 30.8333 7.6224 30.8333 8.33323V33.7499L20 29.1024L9.16663 33.7499ZM11.2608 30.5428L20 26.8182L28.7391 30.5428V8.33323C28.7391 8.20517 28.6858 8.08767 28.5791 7.98073C28.4722 7.87378 28.3545 7.82031 28.2262 7.82031H11.7737C11.6454 7.82031 11.5277 7.87378 11.4208 7.98073C11.3141 8.08767 11.2608 8.20517 11.2608 8.33323V30.5428Z"
          fill="#F9F7F0"
        />
      </g>
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
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default CardBookmarkIcon;
