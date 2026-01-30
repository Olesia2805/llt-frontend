import { useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import styles from "./CurrencyDropdown.module.css";
import { useClickOutside } from "../../hooks/useClickOutside";

const CURRENCIES = ["USD", "EUR", "UAH"];

const CurrencyDropdown = ({ value, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggle = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (currency) => {
    onChange(currency);
    setIsOpen(false);
  };

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className={styles.dropdown}>
      <button
        type="button"
        className={clsx(styles.toggle, isOpen && styles.open)}
        onClick={toggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {value}
        <IoIosArrowDown
          className={clsx(styles.arrow, isOpen && styles.arrowOpen)}
        />
      </button>

      {isOpen && (
        <ul className={styles.menu} role="listbox">
          {CURRENCIES.map((currency) => (
            <li key={currency}>
              <button
                type="button"
                className={styles.menuItem}
                onClick={() => handleSelect(currency)}
                disabled={currency === value}
                role="option"
                aria-selected={currency === value}
              >
                {currency}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencyDropdown;
