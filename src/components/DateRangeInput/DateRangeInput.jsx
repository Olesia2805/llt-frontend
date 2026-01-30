import { useSelector } from "react-redux";
import DatePicker, { registerLocale } from "react-datepicker";
import { uk, enUS } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateRangeInput.module.css";

registerLocale("uk", uk);
registerLocale("en", enUS);

const DateRangeInput = ({
  startDate,
  endDate,
  onChange,
  disabled = false,
  error,
  placeholderText,
}) => {
  const { preferences } = useSelector((state) => state.userData);
  const lang = preferences?.language || "uk";

  return (
    <>
      <div className={styles.inputContainer}>
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          dateFormat="dd.MM.yyyy"
          className={styles.input}
          calendarClassName={styles.calendar}
          disabled={disabled}
          minDate={new Date()}
          isClearable
          placeholderText={placeholderText}
          dayClassName={() => styles.day}
          locale={lang}
          portalId="root-portal"
        />
      </div>
    </>
  );
};

export default DateRangeInput;
