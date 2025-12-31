// import styles from "./OfferListCard.module.css";

const OfferListCard = ({ title, description, Icon }) => {
  return (
    <li>
      <div>{Icon && <Icon />}</div>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
};

export default OfferListCard;
