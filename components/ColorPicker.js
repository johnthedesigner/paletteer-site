import { CustomPicker } from "react-color";
import {
  EditableInput,
  Hue,
  Saturation,
} from "react-color/lib/components/common";

const SliderHandle = () => {
  return <div className="color-picker__slider-handle" />;
};

const HueHandle = () => {
  return <div className="color-picker__hue-handle" />;
};

const ColorPicker = ({ color, hex, hsl, hsv, onChange }) => {
  return (
    <>
      <div className="color-picker">
        <div className="color-picker__hex">
          <EditableInput value={color} onChange={onChange} />
        </div>
        <div className="color-picker__saturation">
          <Saturation
            color={color}
            hex={hex}
            hsl={hsl}
            hsv={hsv}
            onChange={onChange}
            pointer={HueHandle}
          />
        </div>
        <div className="color-picker__hue">
          <Hue
            color={color}
            hex={hex}
            hsl={hsl}
            hsv={hsv}
            onChange={onChange}
            pointer={SliderHandle}
          />
        </div>
      </div>
    </>
  );
};

export default CustomPicker(ColorPicker);
