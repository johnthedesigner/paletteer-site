const ModeIcon = ({ darkMode }) => {
  return (
    <div className="mode-icon">
      <svg
        className={`mode-icon__light ${
          darkMode ? "mode-icon__light--disabled" : ""
        }`}
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="17.5" fill="#f0f3ff" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22ZM18 24C21.3137 24 24 21.3137 24 18C24 14.6863 21.3137 12 18 12C14.6863 12 12 14.6863 12 18C12 21.3137 14.6863 24 18 24Z"
          fill="#14467b"
        />
        <rect
          x="22.9502"
          y="24.364"
          width="2"
          height="4"
          rx="1"
          transform="rotate(-45 22.9502 24.364)"
          fill="#14467b"
        />
        <rect
          x="8.80762"
          y="10.2218"
          width="2"
          height="4"
          rx="1"
          transform="rotate(-45 8.80762 10.2218)"
          fill="#14467b"
        />
        <rect
          x="11.6357"
          y="22.9498"
          width="2"
          height="4"
          rx="1"
          transform="rotate(45 11.6357 22.9498)"
          fill="#14467b"
        />
        <rect
          x="25.7783"
          y="8.80762"
          width="2"
          height="4"
          rx="1"
          transform="rotate(45 25.7783 8.80762)"
          fill="#14467b"
        />
        <rect
          x="26"
          y="18.9999"
          width="2"
          height="6"
          rx="1"
          transform="rotate(-90 26 18.9999)"
          fill="#14467b"
        />
        <rect
          x="4"
          y="18.9999"
          width="2"
          height="6"
          rx="1"
          transform="rotate(-90 4 18.9999)"
          fill="#14467b"
        />
        <rect x="17" y="26" width="2" height="6" rx="1" fill="#14467b" />
        <rect x="17" y="4" width="2" height="6" rx="1" fill="#14467b" />
      </svg>
      <svg
        className={`mode-icon__dark ${
          darkMode ? "" : "mode-icon__dark--disabled"
        }`}
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="17.5" fill="#14467b" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 11.0703C19.6088 12.4535 18 15.0389 18 18C18 20.9611 19.6088 23.5465 22 24.9297C20.8233 25.6104 19.4571 26 18 26C13.5817 26 10 22.4183 10 18C10 13.5817 13.5817 10 18 10C19.4571 10 20.8233 10.3896 22 11.0703Z"
          fill="#f0f3ff"
        />
      </svg>
    </div>
  );
};

export default ModeIcon;
