import ModalContainer from "../ModalContainer/ModalContainer";
import styles from "./ModalOurTeam.module.css";
import ModalOurTeamCard from "../ModalOurTeamCard/ModalOurTeamCard";
import Button from "../Button/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import defaultImg from "../../assets/img/default-avatar.jpg";
import olesiaVysotinaImg from "../../assets/img/olesia-vysotina.webp";
import ievgenTymoshenkoImg from "../../assets/img/ievgen-tymoshenko.webp";
import dmytroBalakinImg from "../../assets/img/dmytro-balakin.webp";

const teamMembers = [
  {
    key: "olesiaVysotina",
    linkedIn: "https://www.linkedin.com/in/olesia-vysotina",
    gitHub: "https://github.com/Olesia2805",
    img: olesiaVysotinaImg,
  },
  {
    key: "ievgenTymoshenko",
    linkedIn: "https://www.linkedin.com/in/ievgen-tymoshenko-a24255311/",
    gitHub: "https://github.com/demosph",
    img: ievgenTymoshenkoImg,
  },
  {
    key: "dmytroBalakin",
    linkedIn: "https://www.linkedin.com/in/dmytro-balakin/",
    gitHub: "https://github.com/BalakaMd",
    img: dmytroBalakinImg,
  },
];

const ModalOurTeam = ({ isOpen, onClose }) => {
  const { t } = useTranslation("common");

  if (!isOpen) return null;

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className={styles.overlay}>
        <div className={styles.backdrop} onClick={onClose} />

        <div className={styles.modal}>
          <Button
            variant="closeBtn"
            onClick={onClose}
            leftIcon={<IoIosCloseCircleOutline />}
          />

          <header className={styles.header}>
            <h2 className={styles.title}>{t("footer.team.headerTitle")}</h2>
            <p className={styles.subtitle}>{t("footer.team.headerSubtitle")}</p>
          </header>

          <ul className={styles.cards}>
            {teamMembers.map((member) => {
              const data = t(`footer.team.members.${member.key}`, {
                returnObjects: true,
              });

              return (
                <li key={member.key}>
                  <ModalOurTeamCard
                    name={data.name}
                    role={data.role}
                    img={member.img || defaultImg}
                    linkedIn={member.linkedIn}
                    gitHub={member.gitHub}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ModalOurTeam;
