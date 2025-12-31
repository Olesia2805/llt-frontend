import { FaCheck } from "react-icons/fa";
// import Button from "../Button/Button";
// import styles from "./ChooseReasonsCard.module.css";

const ChooseReasonsCard = ({ title, description }) => {
  return (
    <li>
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
};

export default ChooseReasonsCard;
