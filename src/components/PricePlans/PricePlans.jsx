import { useTranslation } from "react-i18next";
import Section from "../Section/Section";
import PricePlansCard from "../PricePlansCard/PricePlansCard";
import { PRICE_PLANS } from "../../app/sectionsGuestData.js";

const PricePlans = () => {
  const { t } = useTranslation("homeGuest");

  return (
    <Section>
      <div className="sectionHeaderWrapper">
        <h2>{t("pricePlans.title")}</h2>
        <p>{t("pricePlans.description")}</p>
      </div>

      <ul>
        {PRICE_PLANS(t).map((plan) => (
          <PricePlansCard key={plan.id} {...plan} />
        ))}
      </ul>
    </Section>
  );
};

export default PricePlans;
