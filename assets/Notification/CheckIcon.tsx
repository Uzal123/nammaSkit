import React from "react";

type Props = {
  className?: string;
  width?: number;
  height?: number;
};

const CheckIcon: React.FC<Props> = ({
  className = "",
  width = 24,
  height = 24,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <style type="text/css">
      {`.st0{fill:none;stroke:#1FC39E;stroke-width:1.6724;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
      .st1{fill:none;stroke:#1FC39E;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
      .st2{fill:none;stroke:#1FC39E;stroke-width:1.5;stroke-linejoin:round;stroke-miterlimit:10;}`}
    </style>
    <g>
      <g>
        <circle className="st1" cx="12" cy="12" r="11.2" />
      </g>
      <g>
        <polyline className="st1" points="7.2,12 10.4,15.2 16.8,8.8" />
      </g>
    </g>
  </svg>
);

export default CheckIcon;
