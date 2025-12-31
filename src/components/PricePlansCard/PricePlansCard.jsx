import { FaCheck } from "react-icons/fa";
// import Button from "../Button/Button";
// import styles from "./PricePlansCard.module.css";

const PricePlansCard = ({
  title,
  description,
  price,
  period,
  features,
  //   buttonText,
  popular,
}) => {
  return (
    <li>
      {popular && <span>POPULAR</span>}

      <h3>{title}</h3>
      <p>{description}</p>

      <p>
        <strong>{price}</strong>
        {period && <span>{period}</span>}
      </p>

      <ul>
        {features.map((feature) => (
          <li key={feature.id}>
            <FaCheck />
            {feature.text}
          </li>
        ))}
      </ul>
      {/* <Button /> */}
    </li>
  );
};

export default PricePlansCard;
