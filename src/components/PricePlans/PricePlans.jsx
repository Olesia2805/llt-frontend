import { useTranslation } from "react-i18next";
import Section from "../Section/Section";
import Container from "../Container/Container";
import PricePlansCard from "../PricePlansCard/PricePlansCard";
import { PRICE_PLANS } from "../../app/sectionsGuestData.js";
import styles from "./PricePlans.module.css";

const PricePlans = () => {
  const { t } = useTranslation("homeGuest");

  return (
    <Section variant="altBG">
      <Container>
        <div className="sectionHeaderWrapper">
          <h2>{t("pricePlans.title")}</h2>
          <p>{t("pricePlans.description")}</p>
        </div>

        <ul className={styles.list}>
          {Object.values(PRICE_PLANS(t)).map((plan) => (
            <PricePlansCard key={plan.id} {...plan} />
          ))}
        </ul>
      </Container>
    </Section>
  );
};

export default PricePlans;
