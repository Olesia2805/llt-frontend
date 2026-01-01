import { FaCheck } from "react-icons/fa";
// import Button from "../Button/Button";
// import styles from "./PricePlansCard.module.css";

const PricePlansCard = ({
  title,
  description,
  price,
  period,
  features,
  buttonText,
  popular,
}) => {
  return (
    <li>
      {popular && <span>POPULAR</span>}

      <h3>{title}</h3>
      <p>{description}</p>

      <p>
        {price}
        {period && <span>/{period}</span>}
      </p>

      <ul>
        {features.map((feature) => (
          <li key={feature.id}>
            <FaCheck />
            <p>{feature.text}</p>
          </li>
        ))}
      </ul>

      <button type="button">{buttonText}</button>
    </li>
  );
};

export default PricePlansCard;
