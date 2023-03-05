import { CustomPicker } from "react-color";
import {
  EditableInput,
  Hue,
  Saturation,
} from "react-color/lib/components/common";

const ColorPicker = ({ color, hex, hsl, hsv, onChange }) => {
  return (
    <>
      <div className="color-picker">
        <div className="color-picker__saturation">
          <Saturation
            color={color}
            hex={hex}
            hsl={hsl}
            hsv={hsv}
            onChange={onChange}
          />
        </div>
        <div className="color-picker__hue">
          <Hue
            color={color}
            hex={hex}
            hsl={hsl}
            hsv={hsv}
            onChange={onChange}
          />
        </div>
        <div className="color-picker__hex">
          <EditableInput value={color} onChange={onChange} />
        </div>
      </div>
    </>
  );
};

export default CustomPicker(ColorPicker);
