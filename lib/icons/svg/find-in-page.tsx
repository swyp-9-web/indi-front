import { SVGProps } from 'react';

const FindInPageIcon = ({ size = 48, ...props }: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_1026_10238"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="48"
      height="48"
    >
      <rect width="48" height="48" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_1026_10238)">
      <path
        d="M32.6 41L35.6 44H11C10.2 44 9.5 43.7 8.9 43.1C8.3 42.5 8 41.8 8 41V7C8 6.2 8.3 5.5 8.9 4.9C9.5 4.3 10.2 4 11 4H29.6L40 15.95V40.3C40 40.7667 39.875 41.2417 39.625 41.725C39.375 42.2083 39.0667 42.6 38.7 42.9L28.1 32.3C27.4333 32.7 26.772 32.9833 26.116 33.15C25.4597 33.3167 24.7543 33.4 24 33.4C21.9333 33.4 20.1917 32.6917 18.775 31.275C17.3583 29.8583 16.65 28.1167 16.65 26.05C16.65 23.9833 17.3583 22.2417 18.775 20.825C20.1917 19.4083 21.9333 18.7 24 18.7C26.0667 18.7 27.8083 19.4083 29.225 20.825C30.6417 22.2417 31.35 23.9833 31.35 26.05C31.35 26.8167 31.2417 27.55 31.025 28.25C30.8083 28.95 30.4833 29.5667 30.05 30.1L37 37.05V16.9L28.4 7H11V41H32.6ZM24 30.4C25.2667 30.4 26.3083 29.9083 27.125 28.925C27.9417 27.9417 28.35 26.8 28.35 25.5C28.35 24.4 27.9167 23.4917 27.05 22.775C26.1833 22.0583 25.1667 21.7 24 21.7C22.8333 21.7 21.8167 22.0583 20.95 22.775C20.0833 23.4917 19.65 24.4 19.65 25.5C19.65 26.8 20.0583 27.9417 20.875 28.925C21.6917 29.9083 22.7333 30.4 24 30.4Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default FindInPageIcon;
