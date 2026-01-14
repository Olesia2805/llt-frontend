import styles from "./ModalOurTeamCard.module.css";
import Button from "../Button/Button";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const ModalOurTeamCard = ({ name, role, img, linkedIn, gitHub }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <img src={img} alt={name} />
      </div>
      <h3>{name}</h3>
      <p>{role}</p>
      <div className={styles.links}>
        <Button href={linkedIn} leftIcon={<FaLinkedin />} />
        <Button href={gitHub} leftIcon={<FaGithub />} />
      </div>
    </div>
  );
};

export default ModalOurTeamCard;
