import { useTranslation } from "react-i18next";
import Section from "../Section/Section";
import { CHOOSE_REASONS } from "../../app/sectionsGuestData.js";
import ChooseReasonsCard from "../ChooseReasonsCard/ChooseReasonsCard";

const ChooseReasons = () => {
  const { t } = useTranslation("homeGuest");

  return (
    <Section>
      <div className="sectionHeaderWrapper">
        <h2>{t("chooseReasons.title")}</h2>
        <p>{t("chooseReasons.description")}</p>
      </div>

      <ul>
        {CHOOSE_REASONS(t).map((reason) => (
          <ChooseReasonsCard key={reason.id} {...reason} />
        ))}
      </ul>
    </Section>
  );
};

export default ChooseReasons;
