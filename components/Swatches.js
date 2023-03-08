import _ from "lodash";

let swatches = [
  "#ABB8C3",
  "#EB144C",
  "#FF7461",
  "#FFA23F",
  "#FFC107",
  "#FFE63B",
  "#34CC79",
  "#7BDCB5",
  "#67F3FF",
  "#2B9CFF",
  "#4360FA",
  "#9900EF",
];

const Swatches = ({ color, updateSeedColor }) => {
  return (
    <div className="sample-swatches">
      {_.map(swatches, (swatch) => {
        return (
          <svg
            key={swatch}
            className="sample-swatch"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => updateSeedColor({ hex: swatch })}>
            <circle
              cx="18"
              cy="18"
              r="12"
              fill={swatch}
              stroke={swatch === color ? "black" : "none"}
            />
          </svg>
        );
      })}
    </div>
  );
};

export default Swatches;
