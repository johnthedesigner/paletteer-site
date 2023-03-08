const SwatchContrast = ({ whiteContrast, blackContrast, color }) => {
  return (
    <svg
      className="contrast-dot"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M60 0C26.8629 0 0 26.8629 0 60H120C120 26.8629 93.1371 0 60 0Z"
        fill="white"
      />
      <path
        d="M60 120C93.1371 120 120 93.1371 120 60L0 60C-2.89693e-06 93.1371 26.8629 120 60 120Z"
        fill="black"
      />
      <text x="60" y="50" textAnchor="middle" fill={color} fontSize="30">
        {whiteContrast}
      </text>
      <text x="60" y="92" textAnchor="middle" fill={color} fontSize="30">
        {blackContrast}
      </text>
    </svg>
  );
};

export default SwatchContrast;
