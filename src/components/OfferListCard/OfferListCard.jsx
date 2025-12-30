// import styles from "./OfferListCard.module.css";

const OfferListCard = ({ title, description, Icon }) => {
  return (
    <div>
      <div>{Icon && <Icon />}</div>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default OfferListCard;
