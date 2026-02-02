import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./CityAutocomplete.module.css";
import InputField from "../InputField/InputField";
import { searchCities } from "../../services/integration.api";
import { FaSearch } from "react-icons/fa";
import Button from "../Button/Button";
import { useClickOutside } from "../../hooks/useClickOutside";
import Loader from "../Loader/Loader";

const CityAutocomplete = ({
  value,
  onChange,
  onSelect,
  placeholder,
  error,
  disabled,
}) => {
  const { t } = useTranslation();
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => setIsOpen(false));

  const handleSearch = async () => {
    if (!value || value.length < 2) return;
    setLoading(true);
    try {
      const data = await searchCities(value);
      setResults(data);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    onChange({
      target: { name: "city", value: `${item.city}, ${item.country}` },
    });
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <div ref={ref} className={styles.dropdown}>
      <InputField
        name="city"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        disabled={disabled || loading}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        rightElement={
          <Button
            variant="inputBtn"
            onClick={handleSearch}
            disabled={loading || !value || value.length < 2}
            rightIcon={
              loading ? <Loader size={20} /> : <FaSearch fontSize="20px" />
            }
          />
        }
      />

      {isOpen && (
        <ul className={styles.menu}>
          {results.length === 0 ? (
            <li className={styles.empty}>{t("noResults")}</li>
          ) : (
            results.map((item, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  className={styles.menuItem}
                  onClick={() => handleSelect(item)}
                >
                  <strong>{item.city}</strong>, {item.country}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;
