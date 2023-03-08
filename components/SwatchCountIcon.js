const SwatchCountIcon = ({ count }) => {
  switch (count) {
    case "s":
      return (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="10" height="24" rx="2" fill="currentcolor" />
          <rect
            x="20"
            y="6"
            width="10"
            height="24"
            rx="2"
            fill="currentcolor"
          />
        </svg>
      );

    case "m":
      return (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect
            x="6"
            y="6"
            width="5.33333"
            height="24"
            rx="2"
            fill="currentcolor"
          />
          <rect
            x="15.333"
            y="6"
            width="5.33333"
            height="24"
            rx="2"
            fill="currentcolor"
          />
          <rect
            x="24.667"
            y="6"
            width="5.33333"
            height="24"
            rx="2"
            fill="currentcolor"
          />
        </svg>
      );

    case "l":
      return (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect
            x="6"
            y="6"
            width="3"
            height="24"
            rx="1.5"
            fill="currentcolor"
          />
          <rect
            x="13"
            y="6"
            width="3"
            height="24"
            rx="1.5"
            fill="currentcolor"
          />
          <rect
            x="20"
            y="6"
            width="3"
            height="24"
            rx="1.5"
            fill="currentcolor"
          />
          <rect
            x="27"
            y="6"
            width="3"
            height="24"
            rx="1.5"
            fill="currentcolor"
          />
        </svg>
      );

    default:
      return null;
  }
};

export default SwatchCountIcon;
