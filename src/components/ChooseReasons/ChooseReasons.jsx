import { useTranslation } from "react-i18next";
import Section from "../Section/Section";
import Container from "../Container/Container";
import { CHOOSE_REASONS } from "../../app/sectionsGuestData.js";
import ChooseReasonsCard from "../ChooseReasonsCard/ChooseReasonsCard";
import styles from "./ChooseReasons.module.css";

const ChooseReasons = () => {
  const { t } = useTranslation("homeGuest");

  return (
    <Section>
      <Container>
        <div className="sectionHeaderWrapper">
          <h2>{t("chooseReasons.title")}</h2>
          <p>{t("chooseReasons.description")}</p>
        </div>

        <ul className={styles.list}>
          {CHOOSE_REASONS(t).map((reason) => (
            <ChooseReasonsCard key={reason.id} {...reason} />
          ))}
        </ul>
      </Container>
    </Section>
  );
};

export default ChooseReasons;
