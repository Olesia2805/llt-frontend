import { RiDoubleQuotesR } from "react-icons/ri";
import Section from "../Section/Section";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation("homeGuest");

  return (
    <Section>
      <h2>{t("testimonials.title")}</h2>
      <p>{t("testimonials.description")}</p>
    </Section>
  );
};

export default Testimonials;
