import * as React from "react";
import { CustomSVGProps } from "@/types";

export default function Biolnk({
  size = 18,
  fill,
  ...otherProps
}: CustomSVGProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 139.71 230.71"
      stroke="currentColor"
      role="presentation"
      aria-label="Biolnk Branding"
      {...otherProps}
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            fill={fill ?? "#e93d82"}
            d="M62.69,230.71h0a62.58,62.58,0,0,1-62.4-62.4h0A5.33,5.33,0,0,1,5.6,163H62.69A5.33,5.33,0,0,1,68,168.31V225.4A5.33,5.33,0,0,1,62.69,230.71Z"
          />
          <path
            fill={fill ?? "#ab4aba"}
            d="M139.71,168.31h0a62.58,62.58,0,0,1-62.4,62.4h0A5.33,5.33,0,0,1,72,225.4V168.31A5.33,5.33,0,0,1,77.31,163H134.4A5.33,5.33,0,0,1,139.71,168.31Z"
          />
          <path
            fill={fill ?? "#f2168a"}
            d="M77.31,91.29h0a62.58,62.58,0,0,1,62.4,62.4h0A5.33,5.33,0,0,1,134.4,159H77.31A5.33,5.33,0,0,1,72,153.69V96.6A5.33,5.33,0,0,1,77.31,91.29Z"
          />
          <path
            fill={fill ?? "#ab4aba"}
            d="M139.71,168.31h0a62.58,62.58,0,0,1-62.4,62.4h0A5.33,5.33,0,0,1,72,225.4V168.31A5.33,5.33,0,0,1,77.31,163H134.4A5.33,5.33,0,0,1,139.71,168.31Z"
          />
          <path
            fill={fill ?? "#e93d82"}
            d="M77.31,91.29h0a62.58,62.58,0,0,1,62.4,62.4h0A5.33,5.33,0,0,1,134.4,159H77.31A5.33,5.33,0,0,1,72,153.69V96.6A5.33,5.33,0,0,1,77.31,91.29Z"
          />
          <path
            fill={fill ?? "#ab4aba"}
            d="M62.69,159H5.31A5.33,5.33,0,0,1,0,153.69V58.42A58.59,58.59,0,0,1,58.42,0h4.27A5.33,5.33,0,0,1,68,5.31V153.69A5.33,5.33,0,0,1,62.69,159Z"
          />
        </g>
      </g>
    </svg>
  );
}
